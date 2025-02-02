<script>
  import Header from './UI/Header.svelte';
  import MeetupItem from './Meetups/MeetupItem.svelte';

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

<section id="meetups">
  {#each MEETUPS as meetup}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
      address={meetup.address}
      email={meetup.contactEmail}
    />
  {/each}
</section>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>
