<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
export default {
  components: {
    CoachForm
  },

  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data)
      this.$router.replace('/coaches') // przerzuca nas do wskazanego miejsca ale nie możemy wrócić do miejsca skąd żeśmy przyszli można też zamiast replace użyć push, które nie ma takiego ograniczenia
    }
  }
}
</script>
