<template>
    <div>
      <img :src="iconPath" class="icon" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      iconName: {
        type: String,
        required: true, // Le nom de l'icône est obligatoire
      },
    },
    computed: {
      iconPath() {
        try {
          return require(`@/assets/icons/${this.iconName}.svg`);
        } catch (error) {
          console.error(`Icon not found: ${this.iconName}`);
          return null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .icon {
    width: 24px;
    height: 24px;
  }
  </style>
  