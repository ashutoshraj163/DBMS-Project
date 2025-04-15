import React from 'react';
import Image from 'next/image';

const RoomBooking: React.FC = () => {
  const roomTypes = [
    {
      type: 'Standard',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/hotel-1867766_1280.jpg',
      description:
        'Our Standard rooms offer a comfortable and affordable stay, perfect for solo travelers or couples. Enjoy a queen-size bed, private bathroom, and essential amenities like a TV and Wi-Fi. These rooms provide a cozy retreat after a day of exploring or business meetings.',
    },
    {
      type: 'Deluxe',
      image: 'https://cdn.pixabay.com/photo/2017/08/06/22/01/hotel-room-2591501_1280.jpg',
      description:
        'Upgrade to our Deluxe rooms for added space and luxury. Featuring a king-size bed, a seating area, and enhanced amenities like a mini-fridge and coffee maker, these rooms provide a relaxing and enjoyable experience for both leisure and business travelers.',
    },
    {
      type: 'Suite',
      image: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/hotel-1836070_1280.jpg',
      description:
        'Indulge in the ultimate comfort and sophistication with our Suites. These spacious accommodations include a separate living area, a king-size bed, a luxurious bathroom with a soaking tub, and premium amenities such as a kitchenette and a balcony with stunning views. Perfect for families or those seeking an exceptional stay.',
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomTypes.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={room.image}
                alt={`${room.type} Room`}
                width={400}
                height={256}
                className="w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{room.type} Room</h3>
                <p className="text-gray-700">{room.description}</p>
                <a
                  href="/book-now"
                  className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomBooking;
