const porscheCars = [
    {
        name: '718',
        carImg: './assets/images/porsche-car-page-image/$1__718/$1__718.webp',
        files: [
            { path: './assets/images/porsche-car-page-image/$1__718/$2__1__video.mp4', type: 'video/mp4' },
            { path: './assets/images/porsche-car-page-image/$1__718/$2__2__video.mp4', type: 'video/mp4' },
            { path: './assets/images/porsche-car-page-image/$1__718/$2__3__video.mp4', type: 'video/mp4' },
            { path: './assets/images/porsche-car-page-image/$1__718/$2__4__video..mp4', type: 'video/mp4' },
        ],
        bg: { path: './assets/images/porsche-car-page-image/$1__718/$2__bg.webp', type: 'application/octet-stream' },
        text1: "The Porsche 718 offers a thrilling driving experience with its powerful mid-engine design, delivering exceptional balance and responsiveness on the road.",
        text2: "This model is perfect for those who seek agility and precise handling on every turn, combining sports car performance with everyday usability in a compact package.",
    },
    {
        name: '911',
        carImg: './assets/images/porsche-car-page-image/$2__911/$1__911.avif',
        files: [
            { name: '1__img', path: './assets/images/porsche-car-page-image/$2__911/$2__1__img.avif', type: 'image/avif' },
            { name: '$2__4__video', path: './assets/images/porsche-car-page-image/$2__911/$2__4__video/hls.m3u8' },
            { name: '2__img', path: './assets/images/porsche-car-page-image/$2__911/$2__2__img.avif', type: 'image/avif' },
            { name: '3__img', path: './assets/images/porsche-car-page-image/$2__911/$2__3__img.avif', type: 'image/avif' },
        ],
        text1: "The Porsche 911 is iconic for its timeless design and top-tier performance, continuing a legacy of excellence that spans generations of sports car enthusiasts.",
        text2: "With its rear-engine layout, the 911 delivers exhilarating power and unmatched speed, while maintaining the comfort and practicality for which Porsche is renowned.",
    },
    {
        name: 'taycan',
        carImg: './assets/images/porsche-car-page-image/$3__taycan/$1__taycan.avif',
        files: [
            { path: './assets/images/porsche-car-page-image/$3__taycan/$2__4__video/hls.m3u8', type: 'x-mpegurl' },
            { path: './assets/images/porsche-car-page-image/$3__taycan/$2__3__video/hls.m3u8', type: 'x-mpegurl' },
            { path: './assets/images/porsche-car-page-image/$3__taycan/$2__1__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$3__taycan/$2__2__img.avif', type: 'image/avif' },
        ],
        text1: "The Taycan is Porsche's fully electric sports car, blending power and sustainability with cutting-edge technology and unmistakable Porsche DNA.",
        text2: "Experience instant acceleration and cutting-edge technology with the Taycan, which offers a glimpse into the future of high-performance electric vehicles without compromising on driving pleasure.",
    },
    {
        name: 'panamera',
        carImg: './assets/images/porsche-car-page-image/$4__panamera/$1__panamera.avif',
        files: [
            { path: './assets/images/porsche-car-page-image/$4__panamera/$2__1__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$4__panamera/$2__2__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$4__panamera/$2__3__video/hls.m3u8', type: 'x-mpegurl' },
            { path: './assets/images/porsche-car-page-image/$4__panamera/$2__4__video/hls.m3u8', type: 'x-mpegurl' },
        ],
        text1: "The Porsche Panamera offers luxury and performance in perfect harmony, ideal for long-distance drives and daily commutes alike, with its spacious interior and advanced features.",
        text2: "Combining the space and comfort of a luxury sedan with the heart and soul of a sports car, the Panamera is versatile and powerful, catering to those who refuse to compromise.",
    },
    {
        name: 'macan',
        carImg: './assets/images/porsche-car-page-image/$5__macan/$1__macan.avif',
        files: [
            { path: './assets/images/porsche-car-page-image/$5__macan/$2__1__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$5__macan/$2__2__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$5__macan/$2__3__img.avif', type: 'image/avif' },
            { path: './assets/images/porsche-car-page-image/$5__macan/$2__4__img.avif', type: 'image/avif' },
        ],
        text1: "The Porsche Macan is a compact SUV that offers dynamic handling and sporty design, bringing the Porsche driving experience to the crossover segment with style and precision.",
        text2: "With the Macan, you can enjoy everyday practicality combined with high performance, making it the perfect choice for those who demand versatility without sacrificing driving pleasure."
    },
    {
        name: 'cayenne',
        carImg: './assets/images/porsche-car-page-image/$6__cayenne/$1__cayenne.webp',
        files: [
            { path: './assets/images/porsche-car-page-image/$6__cayenne/$2__1__img.webp', type: 'application/octet-stream' },
            { path: './assets/images/porsche-car-page-image/$6__cayenne/$2__2__img.webp', type: 'application/octet-stream' },
            { path: './assets/images/porsche-car-page-image/$6__cayenne/$2__3__img.webp', type: 'application/octet-stream' },
            { path: './assets/images/porsche-car-page-image/$6__cayenne/$2__4__img.webp', type: 'application/octet-stream' },
        ],
        bg: { path: './assets/images/porsche-car-page-image/$6__cayenne/$2__bg.webp', type: 'application/octet-stream' },
        text1: "The Porsche Cayenne combines luxury with the capabilities of an SUV for all terrains, offering a perfect blend of comfort, performance, and adaptability for any driving situation.",
        text2: "With its advanced technology, spacious interior, and impressive off-road capabilities, the Cayenne is ideal for families and adventurers alike, proving that an SUV can deliver true Porsche performance.",
    },
    {
        name: "GT2 Stradale",
        carImg: "./assets/videos/Maserati-Car-Slider/$1__slide/$1__GT2-Stradale.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/$1__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/$2__2.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/$2__3.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/$2__img.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$1__GT2-Stradale/Celebrating victory with the Maserati GT2 at Circuit of Spa-Francorchamps, June 2024.jpg", type: "image/jpeg" }
        ],
        text1: "Experience pure racing adrenaline with the Maserati GT2 Stradale. Built to perform, designed to thrill.",
        text2: "Uncompromising power and precision, engineered for the most demanding tracks."
    },
    {
        name: "GranCabrio",
        carImg: "./assets/videos/Maserati-Car-Slider/$2__slide/$1__GranCabrio.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$1__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$2__2.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$2__3.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$2__img.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$2__Grancabrio/$3__img.png", type: "image/png" }
        ],
        text1: "GranCabrio – a car that embodies elegance and performance. Where Italian craftsmanship meets open-air freedom.",
        text2: "Live life to the fullest with the GranCabrio, a convertible that captures the essence of luxury."
    },
    {
        name: "GranTurismo",
        carImg: "./assets/videos/Maserati-Car-Slider/$3__slide/$1__GranTurismo.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$3__Granturismo/$1__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$3__Granturismo/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$3__Granturismo/$2__2.jpeg", type: "image/jpeg" },
            { path: "./assets/images/Maserati-car-page-img/$3__Granturismo/$2__3.jpg", type: "image/jpeg" },
            // { path: "./assets/images/Maserati-car-page-img/$3__Granturismo/$2__img.webp", type: "application/octet-stream" }
        ],
        text1: "The Maserati Granturismo combines luxurious comfort with thrilling performance, ready for every adventure.",
        text2: "A true icon of the road, designed for those who demand style, speed, and sophistication."
    },
    {
        name: "Grecale",
        carImg: "./assets/videos/Maserati-Car-Slider/$4__slide/$1__Grecale.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$4__Grecale/$1__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$4__Grecale/$2__1.jpg", type: "image/jpeg" },
            { path: "./assets/images/Maserati-car-page-img/$4__Grecale/$2__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$4__Grecale/$3__img.webp", type: "application/octet-stream" }
        ],
        text1: "The Grecale is an SUV designed for performance, luxury, and adventure. Elevate your drive with unmatched versatility.",
        text2: "From comfort to sport mode, the Grecale offers a driving experience for every occasion."
    },
    {
        name: "Ghibli",
        carImg: "./assets/videos/Maserati-Car-Slider/$5__slide/$1__Ghibli.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$5__Ghibli/$1__img.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$5__Ghibli/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$5__Ghibli/$2__3.mp4", type: "video/mp4" },
            { path: "./assets/images/Maserati-car-page-img/$5__Ghibli/$2__video.mp4", type: "video/mp4" },
            // { path: "./assets/images/Maserati-car-page-img/$5__Ghibli/$3__img.webp", type: "application/octet-stream" }
        ],
        text1: "The Ghibli delivers a powerful driving experience, where luxury meets extraordinary performance.",
        text2: "From city streets to open highways, the Ghibli is built to inspire with every turn."
    },
    {
        name: "Levante",
        carImg: "./assets/videos/Maserati-Car-Slider/$6__slide/$1__Levante.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$6__Levante/$1__video.mp4", type: "video/mp4" },
            { path: "./assets/images/Maserati-car-page-img/$6__Levante/$2__1.jpg", type: "image/jpeg" },
            { path: "./assets/images/Maserati-car-page-img/$6__Levante/$2__2.mp4", type: "video/mp4" },
            { path: "./assets/images/Maserati-car-page-img/$6__Levante/$2__3.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$6__Levante/$2__4.webp", type: "application/octet-stream" }
        ],
        text1: "The Maserati Levante is the perfect blend of luxury and off-road capability, ready to conquer any terrain.",
        text2: "Powerful, versatile, and always ready for the next adventure, the Levante stands apart from the crowd."
    },
    {
        name: "Quattroporte",
        carImg: "./assets/videos/Maserati-Car-Slider/$7__slide/$1__Quattroporte.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$7__Quattroporte/$1__video.mp4", type: "video/mp4" },
            { path: "./assets/images/Maserati-car-page-img/$7__Quattroporte/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$7__Quattroporte/$2__2.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$7__Quattroporte/$2__3.webp", type: "application/octet-stream" },
            // { path: "./assets/images/Maserati-car-page-img/$7__Quattroporte/$3__img.webp", type: "application/octet-stream" }
        ],
        text1: "The Maserati Quattroporte embodies luxury, performance, and comfort in one sophisticated package.",
        text2: "For those who demand more, the Quattroporte is an experience like no other."
    },
    {
        name: "MC20",
        carImg: "./assets/videos/Maserati-Car-Slider/$8__slide/$1__MC20.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$8__MC20/$1__img.jpg", type: "image/jpg" },
            { path: "./assets/images/Maserati-car-page-img/$8__MC20/clouds.jpg", type: "image/jpg" },
            { path: "./assets/images/Maserati-car-page-img/$8__MC20/$1__image.jpg", type: "image/jpg" },
            { path: "./assets/images/Maserati-car-page-img/$8__MC20/$2__1.jpg", type: "image/jpg" },
        ],
        text1: "The MC20 is Maserati’s latest supercar, designed for performance and style like never before.",
        text2: "Every detail of the MC20 is crafted for maximum performance, offering a thrilling driving experience."
    },
    {
        name: "MC20 Cielo",
        carImg: "./assets/videos/Maserati-Car-Slider/$9__slide/$1__MC20-Cielo.webm",
        files: [
            { path: "./assets/images/Maserati-car-page-img/$9__MC20-Cielo/$1__video.mp4", type: "video/mp4" },
            { path: "./assets/images/Maserati-car-page-img/$9__MC20-Cielo/$2__1.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$9__MC20-Cielo/$2__3.webp", type: "application/octet-stream" },
            { path: "./assets/images/Maserati-car-page-img/$9__MC20-Cielo/$2__2.webp", type: "application/octet-stream" }
        ],
        text1: "The MC20 Cielo takes performance and elegance to new heights with its stunning convertible design.",
        text2: "Unveil the sky above you while experiencing the exhilarating speed of the MC20 Cielo."
    }
]

export default porscheCars;