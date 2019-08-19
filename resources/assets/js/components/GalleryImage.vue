<template lang="pug">
  .gallery-image(
    :class="{ 'gallery-image--selected': isHighlighted }"
    @click="$emit('highlight', image)"
  )
    img(
      :src="imagePath"
      :alt="processedAltText"
    )
</template>

<script>
export default {
  name: 'gallery-image',

  props: {
    image: {
      type: Object,
      required: true,
    },
    highlighted: {
      required: false,
      default: null,
    },
  },

  computed: {
    imagePath () {
      return `https://d6d9dbp41whrq.cloudfront.net/${this.image.hash}.${this.image.extension}`
    },
    processedAltText () {
      return (this.image.altText == null) ? '' : this.image.altText
    },
    isHighlighted () {
      return (
        (this.highlighted != null) &&
        (this.highlighted.id === this.image.id)
      )
    }
  }
}
</script>
