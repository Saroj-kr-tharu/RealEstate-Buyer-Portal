'use strict';

const { v4: uuidv4 } = require('uuid');

// Agent IDs from user seeders
const MAHESH_ID = 'b2c3d4e5-f6a7-4890-b123-456789abcdef';
const ROSHAN_ID = '6a604986-52e5-4104-a266-04f27081cdce';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Properties', [
      // --- Mahesh's Listings ---
      {
        id: uuidv4(),
        title: 'Modern Apartment in Thamel',
        description: 'Spacious 2BHK apartment with city views, 24/7 security, parking, and all modern amenities in the heart of Thamel.',
        price: 4500000.00,
        location: 'Thamel, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Luxury Villa in Budhanilkantha',
        description: 'Stunning 4BHK villa surrounded by greenery, private garden, rooftop deck, and mountain views. A rare gem.',
        price: 25000000.00,
        location: 'Budhanilkantha, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Cozy Studio in Lalitpur',
        description: 'Perfect starter home or investment property. Fully furnished studio with high-speed internet and balcony.',
        price: 1800000.00,
        location: 'Pulchowk, Lalitpur',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Riverside Cottage in Sauraha',
        description: 'Charming 2BHK cottage near Chitwan National Park, ideal for eco-tourism or a peaceful retreat with river access.',
        price: 3200000.00,
        location: 'Sauraha, Chitwan',
        imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Budget Flat in Koteshwor',
        description: 'Affordable 1BHK flat with all basic amenities, close to ring road and public transport. Great for young professionals.',
        price: 2200000.00,
        location: 'Koteshwor, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Hill View Bungalow in Nagarkot',
        description: 'Serene 3BHK bungalow with breathtaking sunrise views over the Himalayas. Perfect for weekend getaways or permanent residence.',
        price: 8500000.00,
        location: 'Nagarkot, Bhaktapur',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop',
        createdBy: MAHESH_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // --- Roshan's Listings ---
      {
        id: uuidv4(),
        title: 'Family Home in Bhaktapur',
        description: 'Traditional Newari-style 3BHK home with modern interior, courtyard, and easy access to heritage sites.',
        price: 9500000.00,
        location: 'Suryabinayak, Bhaktapur',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Commercial Space in New Baneshwor',
        description: 'Prime ground-floor commercial property ideal for office or retail. High footfall area with ample parking.',
        price: 12000000.00,
        location: 'New Baneshwor, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Penthouse in Jhamsikhel',
        description: 'Exclusive top-floor penthouse with panoramic Himalayan views, private rooftop terrace, and premium finishes.',
        price: 38000000.00,
        location: 'Jhamsikhel, Lalitpur',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Office Space in Durbarmarg',
        description: 'Prestigious fully fitted office floor in Kathmandu\'s central business district. Ideal for corporate headquarters or startups.',
        price: 18000000.00,
        location: 'Durbarmarg, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Duplex House in Imadol',
        description: 'Spacious 4BHK duplex with private parking, rooftop garden, and modern kitchen. Located in a quiet residential colony.',
        price: 16500000.00,
        location: 'Imadol, Lalitpur',
        imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'Student Apartment near Tribhuvan University',
        description: 'Affordable 1BHK apartment perfect for students and young professionals. Walking distance from TU campus and local market.',
        price: 1500000.00,
        location: 'Kirtipur, Kathmandu',
        imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop',
        createdBy: ROSHAN_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {
      ignoreDuplicates: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Properties', {
      createdBy: {
        [Sequelize.Op.in]: [MAHESH_ID, ROSHAN_ID]
      }
    }, {});
  }
};