// @ts-nocheck
export default {
  before: [],
  after: [
    () =>
      console.log(
        `INIT From Package: { ${packageName} } in file src/app/init.ts`
      ),
  ],
};
