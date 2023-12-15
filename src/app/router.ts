export default {
  before({ commit /*commit, redirect, prev, next*/ }) {
    commit();
    // redirect("/login");
  },
  after(
    {
      /* prev, next */
    }
  ) {
    // console.log(next);
  },
};
