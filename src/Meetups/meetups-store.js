import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 2 hours',
    description: 'Descriptions for coding bootcamp',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
    address: 'Dummy Address Road, 4242',
    contactEmail: 'code@test.com',
    isFavorite: false,
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: "Let's go for some swimming",
    description: 'Descriptions for swim together',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
    address: 'Dummy Address Road, 1234',
    contactEmail: 'swim@test.com',
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    };
    meetups.update((items) => [newMeetup, ...items]);
  },
  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id);
      const updatedMeetup = { ...meetups[meetupIndex], ...meetupData }; // Override original data with meetupData
      // Create updated meetups as a separate list and return
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: (id) => {
    meetups.update((items) => {
      return items.filter((i) => i.id !== id);
    });
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((meetup) => meetup.id === id) }; // Create a copy using the spread operator
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

      const updatedMeetupIndex = items.findIndex((meetup) => meetup.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[updatedMeetupIndex] = updatedMeetup;

      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
