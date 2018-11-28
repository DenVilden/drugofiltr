import View from './View';
import Loader from './Loader';
import { getFilters } from './filters';

export default class Controller {
  constructor(model) {
    this.model = model;

    this.filters = {
      textAll: '',
      textFav: '',
    };

    this.friendsAllDOM = document.querySelector('#friends-all');
    this.friendsFavDOM = document.querySelector('#friends-fav');

    this.renderAll();
    this.renderFav();

    this.friendsAllDOM.addEventListener('click', this.addFriend.bind(this));
    this.friendsFavDOM.addEventListener('click', this.removeFriend.bind(this));
    this.friendsAllDOM.addEventListener('dragstart', this.dragFriend.bind(this));

    this.filterAll();
    this.filterFav();
    this.saveFriends();
  }

  renderAll() {
    // render based on current filter value
    const filtered = getFilters(this.model.friendsAll, this.filters.textAll);
    View.render(this.friendsAllDOM, filtered);
  }

  renderFav() {
    const filtered = getFilters(this.model.friendsFav, this.filters.textFav);
    View.render(this.friendsFavDOM, filtered);
  }

  addFriend(evt) {
    if (evt.target.tagName === 'BUTTON') {
      // get vk id of clicked element
      const id = evt.target.parentElement.dataset.id;
      this.model.addFriend(id);
      this.renderAll();
      this.renderFav();
    }
  }

  dragFriend(evt) {
    const id = evt.target.dataset.id;

    const dragover = (dragEvt) => {
      dragEvt.preventDefault();
    };

    const drop = () => {
      this.model.addFriend(id);
      this.renderAll();
      this.renderFav();

      this.friendsFavDOM.removeEventListener('dragover', dragover);
      this.friendsFavDOM.removeEventListener('drop', drop);
    };

    this.friendsFavDOM.addEventListener('dragover', dragover);
    this.friendsFavDOM.addEventListener('drop', drop);
  }

  removeFriend(evt) {
    if (evt.target.tagName === 'BUTTON') {
      const id = evt.target.parentElement.dataset.id;
      this.model.removeFriend(id);
      this.renderAll();
      this.renderFav();
    }
  }

  filterAll() {
    const input = document.querySelector('.filter-input-all');
    input.addEventListener('input', (evt) => {
      // set filter to current input value
      this.filters.textAll = evt.target.value.trim();
      this.renderAll();
    });
  }

  filterFav() {
    const input = document.querySelector('.filter-input-fav');
    input.addEventListener('input', (evt) => {
      this.filters.textFav = evt.target.value.trim();
      this.renderFav();
    });
  }

  saveFriends() {
    const button = document.querySelector('.footer-button');
    button.addEventListener('click', () => {
      // save to local storage
      Loader.saveFriends(this.model.friendsFav);
      alert('Сохранено');
    });
  }
}
