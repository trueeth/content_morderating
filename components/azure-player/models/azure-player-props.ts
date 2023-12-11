import { IListeners } from "./IListeners";


/**
 * Used to tell the media player how to render and control. extends PLayerDefaultProps
 * 
 * @member compId -Iid to attach to the media player. If attaching events, it is required
 * @member events - Array of  event handlers to attach to the media player.
 * @member events.domEvent - Dom event to attach the function call to.
 * @member events.listeners - Array of functions to call when the event is triggered
 * @member visibility - Whether or not to show the media player on screen.
 * @member source - Unformation on the video to play
 * @member source.src - Url of the encoded media to play
 * @member source.fullscreen - Flag to tell the media player whether to show the full screen button or not
 * @member source.volumeControl - Flag to tell the media player whether to show the volume button or not
 * @member position - position information for the media player
 * @member position.top - How many pixels to place the media player fro the top of the body
 * @member position.left - How many pixels to place the media player from the left of the body
 * @member position.width - How many pixels wide the video should be **NOTE** because of how azure media player work,
 *  this will lock in on first render for the video and to resize will require a restart of the application
 * @member position.height - How many pixels tall the video should be **NOTE** because of how azure media player work,
 *  this will lock in on first render for the video and to resize will require a restart of the application
 * @member control - Information on how and if the video should be controllable
 * @member control.autoPlay - Tells the media player whether or not to automatically start. **NOTE** firefox blocks autoplay without use input. To
 *  work around. start video either through built in button, or some other user action (ie. another button or a previous scene)
 * @member control.controlBar - Whether or not the entire control bar should be rendered for the media player
 * @member control.hidePlayButton - Tells the media player whether or not the render teh giant play button when the video is paused.
 * @member ampLoadTimeout - how long the media player should try to attempt to load the media
 */
export interface PlayerProps extends PlayerDefaultProps {
  compId?: string;
  events?: IListeners[];
  visibility: string;
}




/**
 * Properties of the media player that are auto generated if not included.
 * 
 * @member source - Unformation on the video to play
 * @member source.src - Url of the encoded media to play
 * @member source.fullscreen - Flag to tell the media player whether to show the full screen button or not
 * @member source.volumeControl - Flag to tell the media player whether to show the volume button or not
 * @member position - position information for the media player
 * @member position.top - How many pixels to place the media player fro the top of the body
 * @member position.left - How many pixels to place the media player from the left of the body
 * @member position.width - How many pixels wide the video should be **NOTE** because of how azure media player work,
 *  this will lock in on first render for the video and to resize will require a restart of the application
 * @member position.height - How many pixels tall the video should be **NOTE** because of how azure media player work,
 *  this will lock in on first render for the video and to resize will require a restart of the application
 * @member control - Information on how and if the video should be controllable
 * @member control.autoPlay - Tells the media player whether or not to automatically start. **NOTE** firefox blocks autoplay without use input. To
 *  work around. start video either through built in button, or some other user action (ie. another button or a previous scene)
 * @member control.controlBar - Whether or not the entire control bar should be rendered for the media player
 * @member control.hidePlayButton - Tells the media player whether or not the render teh giant play button when the video is paused.
 * @member ampLoadTimeout - how long the media player should try to attempt to load the media
 */
export interface PlayerDefaultProps {
  source: { src: string; fullscreen: boolean; volumeControl: boolean; type?:string; protectionInfo?:any };
  position: { top: number; left: number; width: number; height: number };
  control: { autoPlay: boolean; controlBar: boolean; hidePlayButton: boolean };
  ampLoadTimeout: number;
}
