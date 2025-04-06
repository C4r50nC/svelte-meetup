import { writable } from 'svelte/store';

const meetups = writable([]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (meetupArray) => {
    meetups.set(meetupArray);
  },
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
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
