<script>
  import { createEventDispatcher } from 'svelte';

  import Button from '../UI/Button.svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';

  import { isEmpty, isValidEmail } from '../helpers/validation';
  import meetups from './meetups-store';

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';
  let formIsValid = false;

  export let id = null;
  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    emailValid &&
    descriptionValid &&
    imageUrlValid;

  function submitForm() {
    const newMeetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    };

    if (id) {
      meetups.updateMeetup(id, newMeetupData);
    } else {
      meetups.addMeetup(newMeetupData);
    }

    dispatch('save');
  }

  function cancel() {
    dispatch('cancel');
  }
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={(event) => (title = event.target.value)}
    />

    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle"
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)}
    />

    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address"
      value={address}
      on:input={(event) => (address = event.target.value)}
    />

    <TextInput
      id="image-url"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)}
    />

    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      valid={emailValid}
      validityMessage="Please enter a valid email"
      value={email}
      on:input={(event) => (email = event.target.value)}
    />

    <TextInput
      id="description"
      label="description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description"
      bind:value={description}
      rows="3"
      controlType="textarea"
    />
  </form>

  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}
      >Save</Button
    >
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
