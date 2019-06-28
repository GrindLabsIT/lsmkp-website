import React, { Component, Fragment } from 'react';
import instafeed from 'react-instafeed';
import Gallery from 'react-grid-gallery';
import { Typography } from '@material-ui/core';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, title: null };
  }

  componentDidMount() {
    instafeed({
      accessToken: '1793897391.e08c05a.473d0f9845f44bf6bc47501f70b5f747',
      clientId: 'e08c05ace95d46d69a9e981e1a7c23d8',
      userId: 'self',
      limit: 8,
    })
      .then(data => data)
      .then(feed => this.setState({ loading: false, data: feed }));
  }

  renderFeed = data => {
    var feed = data.data.map(post => {
      return {
        src: post.images.standard_resolution.url,
        thumbnail: post.images.low_resolution.url,
        thumbnailWidth: post.images.low_resolution.width,
        thumbnailHeight: post.images.low_resolution.height,
        alt: 'Imagem retirada do Instagram',
      };
    });

    return (
      <Gallery
        images={feed}
        enableImageSelection={false}
        showImageCount={false}
        backdropClosesModal={true}
        rowHeight={400}
      />
    );
  };

  render() {
    const { loading, data } = this.state;

    return (
      <Fragment>
        {loading ? (
          <Typography
            align="center"
            variant="body1"
            component="h2"
            color="primary"
          >
            Carregando as fotos do Instagram...
          </Typography>
        ) : (
          this.renderFeed(data)
        )}
      </Fragment>
    );
  }
}

export default Feed;
