const   ContainerOfNotes = document.getElementById("app"),
        addNoteButton = ContainerOfNotes.querySelector(".add-note");
        
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id , note.content); 
    ContainerOfNotes.insertBefore( noteElement , addNoteButton);
    
});

addNoteButton.addEventListener("click" ,  () => addNote() );


function getNotes(){
  return  JSON.parse(localStorage.getItem("stickyNotes-notes") || "[]")
}

function SaveNotes(notes){
    localStorage.setItem("stickyNotes-notes", JSON.stringify(notes));
}

function createNoteElement(id , content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Type Your Note here...";

    element.addEventListener("change" , () => {
        updateNote(id , element.value)
    });

    element.addEventListener("dblclick" , ()=>{
        const Deleteing = confirm("Are you shure you wish to delete this sticky notes? ");
        if( Deleteing){
            deleteNote(id , element);
        }

    })

    return element;
}

function addNote(){
    const notes = getNotes();
    const ObjectNote= {
        id: Math.floor(Math.random() * 100000 ),
        content: ""
    };

    const noteElement = createNoteElement(ObjectNote.id , ObjectNote.content);
    ContainerOfNotes.insertBefore( noteElement , addNoteButton);

    notes.push(ObjectNote);
    SaveNotes(notes);

}

function updateNote(id , newContent){
    const Notes = getNotes();
    const targetNote = Notes.filter( note => note.id == id)[0]

    targetNote.content = newContent
    SaveNotes(Notes);
    

}
function deleteNote(id , element){
const notes =getNotes().filter(note => note.id != id)
SaveNotes(notes)
ContainerOfNotes.removeChild(element)
}
