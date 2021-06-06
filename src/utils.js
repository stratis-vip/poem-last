// toast sections
import {toast} from "react-toastify"
import clonedeep from 'lodash.clonedeep'

const toastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: true
}

export const TypeOptions = {
  'info': 1, 'success': 2,
  'warning': 3, 'error': 4, 'default': 5, 'dark': 6
}

export const TypeOrder = {
  'asc': 1, 'desc': 2
}

export const makeToast = (type, content, options = toastOptions) => {
  switch (type) {
    case TypeOptions.info:
      return toast.info(content, options)
    case TypeOptions.success:
      return toast.success(content, options)
    case TypeOptions.warning:
      return toast.warning(content, options)
    case TypeOptions.error:
      return toast.error(content, options)
    default :
      return toast(content, options)
  }
}

export const isAdmin = (userToCheck) => {
  if (!userToCheck) return false
  console.log('USEEEERRRR', userToCheck)
  return userToCheck.role.filter(a => a === "admin").length > 0
}

export const findInArray = (array, property, value) => {
  if (array?.filter(s => s[property] === value).length > 0) {
    return true
  }
  return false
}

export const findInArrayText = (array, property, value, returnProperty = value) => {
  const retVal =array?.filter(s => s[property] === value)
  if (retVal && retVal.length > 0) {
    return retVal[0][returnProperty]
  }
  return undefined
}

/**
 * Βρίσκει στον πίνακα contents τη μέγιστη και ελάχιστη τιμή της ιδιότητας property
 * @param contents πίνακας με objects [{.... property},...]
 * @param property
 * @return {{min: null, max: null}}
 */
export const getContentMinMaxId = (contents, property) => {
  let max = null;
  let min = null;
  for (const c of contents) {
    const value = c[property];
    if (value >= max) {
      max = value;
    } else if (value <= min) {
      min = value;
    }
    if (min === null) {
      min = max;
    }
  }
  return { min, max }
};

/**
 * Ταξινομεί τον πίνακα με τα αντικείνα που έχουν μια ιδιότητα property. Εξ ορισμού με άυξουσα μορφή.
 * αν θέλουμε να είναι φθίνουσα, βάζουμε order TypeOrder.desc
 * Τονίζεται ότι η ιδιότητα property πρέπει να είναι αριθμητική
 * @param array
 * @param property
 * @param order
 * @return {*}
 */
export const sortContents = (array, property, order = TypeOrder.asc) => {
  const local = clonedeep(array)
  const sortFunction = (a, b) => {
    if (order === TypeOrder.asc) {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  };
  return local.sort(sortFunction)
};

/**
 * Ταξινομεί τον πίνακα με τα αντικείνα που έχουν μια ιδιότητα property. Εξ ορισμού με  φθίνουσα μορφή.
 * αν θέλουμε να είναι αύξουσα, βάζουμε order TypeOrder.asc
 * Τονίζεται ότι η ιδιότητα property πρέπει να είναι ημερμηνία της μορφής YYYY-MM-DD
 * @param array
 * @param property
 * @param order
 * @return {*}
 */
export const sortByDate = (array, property, order = TypeOrder.desc) => {
  const local = clonedeep(array)
  const makeFullDate = (a) => Number(a[property].split('-').join(''))
  const sortFunction = (a,b) => {
    if (order === TypeOrder.asc){
      return makeFullDate(a) - makeFullDate(b)
    }
    return makeFullDate(b) - makeFullDate(a)
  }
  return local.sort(sortFunction)
}

/**
 * Δημουργεί ένα νέο αντικείμενο όπου οι κατηγορίες είναι πια hashes και τα ποίματα είναι
 * σε πίνακα items. Η περιγραφή της κατηγορίας υπάρχει σαν hash.description
 * @param array
 * @return {{}}
 */
export const byCategory = (array) => {
  const local = clonedeep(array)
  const retVal = {}
  for (const c of local){
    const id = c.category.id
    if (!retVal[id]){
      retVal[id] = {description:c.category.description}
      delete c.category
      retVal[id].items =[c]
    }else {
      delete c.category
      retVal[id].items.push(c)
    }
  }
  return retVal
}

export const getString = (order) => {
  switch (order) {
    case TypeOrder.asc :
      return 'asc'
    default :
      return 'desc'
  }
}
export const getOrder = (order) => {
  switch (order) {
    case 'asc':
      return TypeOrder.asc
    default:
      return TypeOrder.desc

  }
}
