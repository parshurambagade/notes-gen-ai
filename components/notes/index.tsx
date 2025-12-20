import DetailedNotes from "./detailed-notes";
import KeyPoints from "./key-points";
import Notes from "./notes";
import NotesBody from "./notes-body";
import NotesHead from "./notes-head";
import NotesVideoHead from "./notes-video-head";
import VideoPlayer from "./video-player";

type NotesComponent = typeof Notes & {
  Head: typeof NotesHead;
  Body: typeof NotesBody;
  KeyPoints: typeof KeyPoints;
  DetailedNotes: typeof DetailedNotes;
  VideoHead: typeof NotesVideoHead;
  VideoPlayer: typeof VideoPlayer;
};

const NotesWithComposition = Notes as NotesComponent;
NotesWithComposition.Head = NotesHead;
NotesWithComposition.Body = NotesBody;
NotesWithComposition.KeyPoints = KeyPoints;
NotesWithComposition.DetailedNotes = DetailedNotes;
NotesWithComposition.VideoHead = NotesVideoHead;
NotesWithComposition.VideoPlayer = VideoPlayer;

export default NotesWithComposition;
