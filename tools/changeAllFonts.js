/**
 * changeAllFonts - Helvetica is included in Acrobat thus saves tons of space
 */


/**
 The base-14 fonts are Times, Helvetica, Courier, and some others and include their bold, italic, etc. variants.
 These fonts (or suitable replacements) are built-in to Acrobat/Reader, so they don't need to be embedded in the document.
 When you use a non-base-14 font, Acrobat embeds the entire font in the PDF so that all of the characters will be available
 when it comes time to enter text in the fields.
 The problem is if you switch back to using the built-in fonts, Acrobat does not remove the font data from the file.

 Times-Roman
 font.Times

 Times-Bold
 font.TimesB

 Times-Italic
 font.TimesI

 Times-BoldItalic
 font.TimesBI

 Helvetica
 font.Helv

 Helvetica-Bold
 font.HelvB

 Helvetica-Oblique
 font.HelvI

 Helvetica-BoldOblique
 font.HelvBI

 Courier
 font.Cour

 Courier-Bold
 font.CourB

 Courier-Oblique
 font.CourI

 Courier-BoldOblique
 font.CourBI

 Symbol
 font.Symbol

 ZapfDingbats
 font.ZapfD
 */

function changeAllFonts(){
    var cnt = 0;
    var allowedFonts = ['Wingdings' , 'perkinelmer', 'perkinelmer4'];
    for (var k in font){
        allowedFonts.push(font[k]);
    }

    for (var i = 0; i < numFields; i++) {
        var fName = getNthFieldName(i);
        if((allowedFonts.indexOf(getField(fName).textFont)== -1)){
            console.println( fName + ': ' + getField(fName).textFont );
            getField(fName).textFont = 'Helvetica';
            cnt++;
        }
    }
    console.println( "\n\rnumFields " + numFields );
    console.println(cnt + "  set to Helvetica" );

}
