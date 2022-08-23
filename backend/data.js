var bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: 'Khushal Khan',
      image:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
      email: 'admin@zalazon.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John Ibraham',
      image:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
      email: 'john@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      isSeller: false,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Martin',
      image:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
      email: 'martin@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      isSeller: false,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'David',
      image:
        'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
      email: 'david@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Nike Slim Skirtt',
      slug: 'nike-slim-shirtt',
      category: 'Skirt',
      image: 'https://i.ibb.co/DG69bQ4/2.png',
      price: 120,
      size: 'XS, S, M, L, XL',
      color: 'black, blue, red, pink',
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '2',
      name: 'Adidas Fit Skirts',
      slug: 'adidas-fit-shirts',
      category: 'Skirt',
      image:
        'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
      price: 100,
      size: 'XS, S, M, L, XL',
      color: 'black, blue, red',
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '3',
      name: 'Lacoste Free Skirt',
      slug: 'lacoste-free-shirt',
      category: 'Skirt',
      image:
        'https://fiver.media/images/mu/2017/04/12/red-pleated-midi-skirt-red-54713-4.jpg',
      price: 220,
      size: 'XS, S, M, L, XL',
      color: 'black, red, pink',
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '4',
      name: 'Nike Slim Skirtr',
      slug: 'nike-slim-shirtr',
      category: 'Pants',
      image:
        'https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png',
      price: 78,
      size: 'XS, S, M, L, XL',
      color: 'blue, red, pink',
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      // _id: '5',
      name: 'Puma Slim Skirt',
      slug: 'puma-slim-shirt',
      category: 'Pants',
      image:
        'https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png',
      price: 65,
      size: 'XS, S, M, L, XL',
      color: 'black, blue, red, pink',
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '6',
      name: 'Adidas Fit Skirte',
      slug: 'adidas-fit-shirte',
      category: 'Pants',
      image:
        'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
      price: 139,
      size: 'XS, S, M, L, XL',
      color: 'black, brown, pink',
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '7',
      name: 'Adidas Fit Skirtk',
      slug: 'adidas-fit-shirtk',
      category: 'Pants',
      image:
        'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
      price: 139,
      size: 'XS, S, M, L, XL',
      color: 'black, green',
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description:
        'DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS. DON NOT COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS',
    },
    {
      // _id: '8',
      name: 'Adidas Fit Skirtp',
      slug: 'adidas-fit-shirtp',
      category: 'Pants',
      image:
        'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
      price: 139,
      size: 'XS, S, M, L, XL',
      color: 'black, pink',
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
  ],
};

const sliderItems = [
  {
    id: 1,
    img: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'SUMMER SALE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'f5fafd',
  },
  {
    id: 2,
    img: 'https://i.ibb.co/cXFnLLV/3.png',
    title: 'AUTUMN COLLECTION',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fcf1ed',
  },
  {
    id: 3,
    img: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'LOUNGEWEAR LOVE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fbf0f4',
  },
  {
    id: 4,
    img: 'https://i.ibb.co/cXFnLLV/3.png',
    title: 'LOUNGEWEAR LOVE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fbf0f4',
  },
  {
    id: 5,
    img: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'LOUNGEWEAR LOVE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fbf0f4',
  },
];

module.exports = { data, sliderItems };
