/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import Header from './Header';
import Overview from './Overview';
import Tickets from './Tickets';
import Images from './Images';
import css from '../styles/attraction.module.css';
// const awsDNS = 'http://ec2-3-139-68-84.us-east-2.compute.amazonaws.com';
const tripLogo = 'https://fec-tripadvisor-images.s3.us-east-2.amazonaws.com/images/Tripadvisor_Logo_circle-green_horizontal-lockup_registered-small_RGB.svg';

export default class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allAttractions: [],
      current: null,
      likeHover: false,
      form: {
        description: '',
        isOpen: false,
        suggestedDuration: 0,
        address: '',
      },
      clickImproved: false,
      openCalendar: false,
      browse: false,
    };
    this.buttonBrowser = this.buttonBrowser.bind(this);
    this.openCloseForm = this.openCloseForm.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.updateHeartHover = this.updateHeartHover.bind(this);
    this.updateLikeStatus = this.updateLikeStatus.bind(this);
    this.submitImprovements = this.submitImprovements.bind(this);
  }

  componentDidMount() {
    axios.get('/api/showcase')
      .then(({ data }) => {
        this.setState({
          allAttractions: data,
          current: data[0],
        });
      }).catch((err) => console.log('error GETTING all', err));
  }

  handleFormChange(e) {
    const { form } = this.state;
    // must copy new value, cannot modify e.target.value directly
    let newValue = e.target.value;
    if (e.target.name === 'suggestedDuration') {
      newValue = Number(newValue);
    }
    if (newValue === 'true') {
      newValue = true;
    }
    if (newValue === 'false') {
      newValue = false;
    }
    this.setState({
      form: {
        ...form,
        [e.target.name]: newValue,
      },
    });
  }

  buttonBrowser(attraction) {
    this.setState({
      current: attraction,
    });
  }

  openCalendar() {
    const { openCalendar } = this.state;
    this.setState({
      openCalendar: !openCalendar,
    });
  }

  openCloseForm() {
    const { clickImproved, form, current } = this.state;
    const {
      description, address, isOpen, suggestedDuration,
    } = current.overview;

    this.setState({
      clickImproved: !clickImproved,
      form: {
        ...form,
        description,
        address,
        isOpen,
        suggestedDuration,
      },
    });
  }

  submitImprovements(id, e) {
    e.preventDefault();
    const { form, current } = this.state;
    if (JSON.stringify(form) === JSON.stringify(current.overview)) {
      console.log('Must Submit Improvements to Current Attraction Listing');
    } else {
      axios.post(`/api/showcase/${id}`, { form })
        .then(({ data }) => {
          this.openCloseForm();
          console.log(data.message);
        })
        .catch((err) => console.log('error', err));
    }
  }

  updateHeartHover() {
    const { likeHover } = this.state;
    this.setState({
      likeHover: !likeHover,
    });
  }

  updateLikeStatus(id) {
    const { current } = this.state;
    this.setState({
      current: {
        ...current,
        likedStatus: !current.likedStatus,
      },
    }, () => {
      axios.patch(`api/showcase/like/${id}`, { likedStatus: !current.likedStatus })
        .catch((err) => {
          console.log('Error PATCH likedStatus ', err);
        });
    });
  }

  render() {
    const {
      current, likeHover, form, clickImproved, allAttractions, browse, openCalendar,
    } = this.state;
    return (
      <>
        {current ? (
          <div className={css.attraction}>
            <div className={css.trip} onClick={() => this.setState({ browse: !browse })}>
              <img src={tripLogo} alt="triplogo" />
            </div>
            {browse && (
            <div className={css.buttons}>
              {allAttractions.map((attraction, i) => (
                <button key={Math.random().toString()} className={css.browseButton} type="button" onClick={() => this.buttonBrowser(attraction)}>{i}</button>
              ))}
            </div>
            )}
            <Header
              current={current}
              updateHeartHover={this.updateHeartHover}
              updateLikeStatus={this.updateLikeStatus}
              likeHover={likeHover}
            />
            <Overview
              overview={current.overview}
              form={form}
              clicked={clickImproved}
              openCloseForm={this.openCloseForm}
              handleFormChange={this.handleFormChange}
              submitImprovements={this.submitImprovements}
              id={current._id} /* eslint-disable-line no-underscore-dangle */
            />
            <Tickets current={current} openCalendar={openCalendar} blackouts={current.closedDays} />
            <Images
              images={current.imageUrl}
              travelersChoice={current.travelersChoiceAward}
              id={current._id} /* eslint-disable-line no-underscore-dangle */
            />
          </div>
        ) : <div className={css.loading}>Loading...new1</div>}
      </>
    );
  }
}
