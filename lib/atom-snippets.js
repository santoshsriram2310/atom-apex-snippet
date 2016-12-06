'use babel';

import AtomSnippetsView from './atom-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSnippetsView = new AtomSnippetsView(state.atomSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSnippetsView.destroy();
  },

  serialize() {
    return {
      atomSnippetsViewState: this.atomSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
