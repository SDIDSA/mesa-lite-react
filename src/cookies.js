const set = (name, value) => {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 3600 * 1000));
    let expires = "expires=" + d.toUTCString();
    let ck = name + "=" + value + ";" + expires + ";path=/;secure";
    console.log(ck);
    document.cookie = ck;
}

const get = (name) => {
    name += "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}

export default {
    set, get
}