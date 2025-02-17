<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import Button from './UI/Button.svelte';

  let meetups = [
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
  ];

  let editMode = null;

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((meetup) => meetup.id === id) }; // Create a copy using the spread operator
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

    const updatedMeetupIndex = meetups.findIndex((meetup) => meetup.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[updatedMeetupIndex] = updatedMeetup;

    meetups = updatedMeetups;
  }
</script>

<Header />

<main>
  <Button caption="New Meetup" on:click={() => (editMode = 'add')} />
  {#if editMode === 'add'}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:toggle-favorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
