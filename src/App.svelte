<script>
  import Header from './UI/Header.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  let meetups = [
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

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="image-url">Image URL</label>
      <input type="text" id="image-url" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        rows="3"
        name="description"
        id="description"
        bind:value={description}
      ></textarea>
    </div>
    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
