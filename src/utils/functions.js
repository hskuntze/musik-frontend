export const makeString = (length) => {
  var result = "";
  var string =
    "ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz1234567890_.-~";
  for (var i = 0; i < length; i++) {
    result += string.charAt(Math.floor(Math.random() * 67));
  }
  return result;
};

export const parseGoogleUrl = (url) => {
  let aux = url.indexOf("#");
  let st = url.substring(aux + 1);
  let fields = st.split("&");
  let obj = {};
  fields.forEach((f) => {
    let split = f.split("=");
    obj[split[0]] = split[1];
  });
  return obj;
};
