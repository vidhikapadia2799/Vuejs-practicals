export default function (context) {
  !context.store.getters.isAuthenticated && context.redirect('/login')
}
