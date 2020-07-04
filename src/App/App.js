import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
// import dummyStore from '../dummy-store';
// import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

/*****************************************************************
 * Implement two fetch requests to two endpoints 
 * when the application mounts: /folders and /notes. 
 * Store the response from these requests using a setState 
 * in whichever component you were keeping your dummy state.
 *****************************************************************/
    componentDidMount() {
        // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
       
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }


/*****************************************************************
 * 
******************************************************************/
    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };




    renderNavRoutes() {
        //const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}

    /*swap the render props in your Route components for component props*/
                        // render={routeProps => (
                        //     <NoteListNav
                        //         folders={folders}
                        //         notes={notes}
                        //         {...routeProps}
                        //     />
                        // )}

                    />
                ))}

                <Route path="/note/:noteId" component={NotePageNav} />

    {/* swap the render props in your Route components for component props */}
                {/* <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                /> */}

                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        //const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}

    /*swap the render props in your Route components for component props*/
                        // render={routeProps => {
                        //     const {folderId} = routeProps.match.params;
                        //     const notesForFolder = getNotesForFolder(
                        //         notes,
                        //         folderId
                        //     );
                            // return (
                            //     <NoteListMain
                            //         {...routeProps}
                            //         notes={notesForFolder}
                            //     />
                            // );
                        // }}
                    />
                ))}

                <Route path="/note/:noteId" component={NotePageMain} />

    {/* swap the render props in your Route components for component props */}
                {/* <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                /> */}
            </>
        );
    }

    render() {

        /////////////////////////////////////////////////////////////////////////////
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };
        /////////////////////////////////////////////////////////////////////////////

        return (
        /////////////////////////////////////////////////////////////////////////////    
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        //////////////////////////////////////////////////////////////////////////////    
        );
    }
}

export default App;
