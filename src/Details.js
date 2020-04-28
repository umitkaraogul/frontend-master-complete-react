import React, { Component, lazy } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { navigate } from "@reach/router";
import { connect } from "react-redux";

const Modal = lazy(() => import("./Modal"));

class Details extends Component {
  state = { loading: true, showModal: false };

  componentDidMount(props) {
    const { id } = this.props;
    pet
      .animal(id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${
            animal.contact.address.state
          }`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          url: animal.url,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  toggleModal = () =>
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  adopt = () => navigate(this.state.url);
  render() {
    const {
      loading,
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal
    } = this.state;

    if (loading) {
      return <h1>loading … </h1>;
    }
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>

          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }) => ({ theme });
const WrappedDetails = connect(mapStateToProps)(Details);

export default props => {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
};
