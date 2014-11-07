// Photoshop Script to Create iPhone Icons from iTunesArtwork
//
// WARNING!!! In the rare case that there are name collisions, this script will
// overwrite (delete perminently) files in the same folder in which the selected
// iTunesArtwork file is located. Therefore, to be safe, before running the
// script, it's best to make sure the selected iTuensArtwork file is the only
// file in its containing folder.
//
// Copyright (c) 2010 Matt Di Pasquale
// Added tweaks Copyright (c) 2012 by Josh Jones http://www.appsbynight.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Prerequisite:
// First, create at least a 1024x1024 px PNG file according to:
// http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
//
// Install - Save Create Icons.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop
//
// Update:
// * Just modify & save, no need to resart Photoshop once it's installed.
//
// Run:
// * With Photoshop open, select File > Scripts > Create Icons
// * When prompted select the prepared iTunesArtwork file for your app.
// * The different version of the icons will get saved to the same folder that
//   the iTunesArtwork file is in.
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html
 
 
// Turn debugger on. 0 is off.
// $.level = 1;
 
try
{
  // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
  var iTunesArtwork = File.openDialog("Select a sqaure PNG file that is at least 1024x1024.", "*.png", false);
 
  if (iTunesArtwork !== null) 
  { 
    var doc = open(iTunesArtwork, OpenDocumentType.PNG);
    
    if (doc == null)
    {
      throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
    }
 
    var startState = doc.activeHistoryState;       // save for undo
    var initialPrefs = app.preferences.rulerUnits; // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;     // use pixels
 
    if (doc.width != doc.height)
    {
        throw "Image is not square";
    }
    else if ((doc.width < 1024) && (doc.height < 1024))
    {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }
    else if (doc.width < 1024)
    {
        throw "Image width is too small!  Image width must be at least 1024 pixels.";
    }
    else if (doc.height < 1024)
    {
        throw "Image height is too small!  Image height must be at least 1024 pixels.";
    }
    
    // Folder selection dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");
 
    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }
 
    // Save icons in PNG using Save for Web.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.PNG;
    sfw.PNG8 = false; // use PNG-24
    sfw.transparency = true;
    doc.info = null;  // delete metadata
    
    var icons = [
      {"name": "iTunesArtwork@2x", "size":1024},
      {"name": "iTunesArtwork",    "size":512},
      
      {"name": "icon-small",          "size":29},
      {"name": "icon-small@2x",       "size":58},
      {"name": "icon-small@3x",       "size":87},
      
      {"name": "icon-40",          "size":40},
      {"name": "icon-40@2x",       "size":80},
      {"name": "icon-40@3x",       "size":120},
      
      {"name": "icon-50",          "size":50},
      {"name": "icon-50@2x",       "size":100},
      
      {"name": "icon",          "size":57},
      {"name": "icon@2x",       "size":114},
      
      {"name": "icon-60@2x",       "size":120},
      {"name": "icon-60@3x",       "size":180},
 
      {"name": "icon-72",          "size":72},
      {"name": "icon-72@2x",       "size":144},
      
      {"name": "icon-76",          "size":76},
      {"name": "icon-76@2x",       "size":152},
      
      {"name": "icon-120",         "size":120}
    ];
 
    var icon;
    for (i = 0; i < icons.length; i++) 
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);
 
      var destFileName = icon.name + ".png";
 
      if ((icon.name == "iTunesArtwork@2x") || (icon.name == "iTunesArtwork"))
      {
        // iTunesArtwork files don't have an extension
        destFileName = icon.name;
      }
 
      doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }
 
    alert("iOS Icons created!");
  }
}
catch (exception)
{
  // Show degbug message and then quit
  if ((exception != null) && (exception != ""))
    alert(exception);
 }
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
  
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}