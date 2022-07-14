<template>
  <div class="border-all rounded">
    <ClientOnly>
      <!-- Use the component in the right place of the template -->
      <tiptap-vuetify
        v-model="content"
        :extensions="extensions"
        class="tiptop-editor"
      />

      <template #placeholder> Loading... </template>
    </ClientOnly>
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Image,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [Bold, Italic, ListItem, BulletList, Image, Link, HardBreak],
    showContent: false,
    // starting editor's content
    content: `
      <p>Type here...</p>
    `,
  }),
};
</script>

<style lang="scss">
.tiptop-editor {
  .v-card {
    box-shadow: none !important;
    border: 0;
  }
  .theme--light.v-toolbar.v-sheet {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>