import { Component } from 'react';
import axios from 'axios';
import SearhBar from './searchBar/SearchBar';
import ImageGallery from './image-gallery/ImageGallery';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    seletedImg: null,
    alt: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProp, prevState) {
    const response = await axios.get(
      `?q=${this.state.searchQuery}&page=${this.state.page}&key=27511871-af3c65d931511896211490940&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: response.data.hits });
      console.log('Mount');
    }
  }
  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };
  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImg: largeImageUrl,
      alt: tags,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImg: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    return (
      <div>
        <SearhBar onSubmit={this.handleFormSubmit} />
        <div>
          {this.state.images.length > 0 ? (
            <ImageGallery
              images={this.state.images}
              // selectedImage={this.handleSelectedImage}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
