class ObjectUtilities {
  /* Your magic here */
  static mergeObjects = (obA, obB) => ({ ...obA, ...obB });
  static removePassword = (ob) => {
    const { password, ...rest } = ob;
    return { ...rest };
  };
  static getOnlyProperties = (ob) => Object.keys(ob);
  static getOnlyValues = (ob) => Object.values(ob);
  static freezeObj = (ob) => Object.freeze(ob);
}

const objA = {
  name: "Nicolas",
  favFood: "Kimchi",
};

const objB = {
  password: "12345",
};

const user = ObjectUtilities.mergeObjects(objA, objB);
console.log(user);

const cleanUser = ObjectUtilities.removePassword(user);
console.log(cleanUser);

const frozenUser = ObjectUtilities.freezeObj(cleanUser);

const onlyValues = ObjectUtilities.getOnlyValues(frozenUser);
console.log(onlyValues);

const onlyProperties = ObjectUtilities.getOnlyProperties(frozenUser);
console.log(onlyProperties);

frozenUser.name = "Hello!"; // This should show an error
