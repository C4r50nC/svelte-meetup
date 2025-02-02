<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';

  const MEETUPS = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'Descriptions for coding bootcamp',
      imageUrl: 'coding image',
      address: 'Dummy Address Road, 4242',
      contactEmail: 'code@test.com',
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: "Let's go for some swimming",
      description: 'Descriptions for swim together',
      imageUrl: 'swimming image',
      address: 'Dummy Address Road, 1234',
      contactEmail: 'swim@test.com',
    },
  ];
</script>

<Header />

<main>
  <MeetupGrid meetups={MEETUPS} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
