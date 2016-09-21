export default function() {
  this.get('/videos', function() {
    return {
      data: [{
        type: 'videos',
        id: 1,
        attributes: {
          Catogory: 'Lifestyle    ',
          Description: 'Royal Flush – The most amazing super slide in the world !',
          link: 'http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com'
        }
      }, {
        type: 'videos',
        id: 2,
        attributes: {
          Catogory: 'Lifestyle',
          Description: 'Amazing magician fooled the audience and judges with card tricks!',
          link: 'http://www.youtube.com/embed/EAN-PwRfJcA?enablejsapi=1&origin=http://example.com'
        }
      }, {
        type: 'videos',
        id: 3,
        attributes: {
          Catogory: 'Lifestyle',
          Description: 'The Biggest Remote Controlled Airbus Flies At Airshow In Switzerland. AMAZING!',
          link: 'http://www.youtube.com/embed/FdrrASk6dhU?enablejsapi=1&origin=http://example.com'
        }
      }]
    };
  });
}
