"use strict"

var util = require("ext/vim/maps/util");

define(function(require, exports, module) {
module.exports = {
    "w": {
        nav: function(editor) {
            editor.navigateWordRight();
        },
        sel: function(editor) {
            editor.selection.selectWordRight();
        }
    },
    "b": {
        nav: function(editor) {
            editor.navigateWordLeft();
        },
        sel: function(editor) {
            editor.selection.selectWordLeft();
        }
    },
    "l": {
        nav: function(editor) {
            editor.navigateRight();
        },
        sel: function(editor) {
            var pos = editor.getCursorPosition();
            var col = pos.column;
            var lineLen = editor.session.getLine(pos.row).length;

            // Solving the behavior at the end of the line due to the
            // different 0 index-based colum positions in ACE.
            if (lineLen && col !== lineLen) //In selection mode you can select the newline
                editor.selection.selectRight();
        }
    },
    "h": {
        nav: function(editor) {
            var pos = editor.getCursorPosition();
            if (pos.column > 0)
                editor.navigateLeft();
        },
        sel: function(editor) {
            var pos = editor.getCursorPosition();
            if (pos.column > 0)
                editor.selection.selectLeft();
        }
    },
    "k": {
        nav: function(editor) {
            editor.navigateUp();
        },
        sel: function(editor) {
            editor.selection.selectUp();
        }
    },
    "j": {
        nav: function(editor) {
            editor.navigateDown();
        },
        sel: function(editor) {
            editor.selection.selectDown();
        }
    },
    "i": {
        param: true,
        sel: function(editor, range, count, param) {
            switch (param) {
                case "w":
                    editor.selection.selectWord();
            }
        }
    },
    "a": {
        param: true,
        sel: function(editor, range, count, param) {
            switch (param) {
                case "w":
                    editor.selection.selectAWord();
            }
        }
    },
    "f": {
        param: true,
        nav: function(editor, range, count, param) {
            count = parseInt(count, 10) || 1;
            var ed = editor;
            var cursor = ed.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count);

            if (typeof column === "number") {
                ed.selection.clearSelection(); // Why does it select in the first place?
                ed.moveCursorTo(cursor.row, column + cursor.column + 1);
            }
        },
        sel: function(editor, range, count, param) {
            count = parseInt(count, 10) || 1;
            var ed = editor;
            var cursor = ed.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count);

            if (typeof column === "number") {
                ed.moveCursorTo(cursor.row, column + cursor.column + 1);
            }
        }
    },
    "t": {
        param: true,
        nav: function(editor, range, count, param) {
            count = parseInt(count, 10) || 1;
            var ed = editor;
            var cursor = ed.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count);

            if (typeof column === "number") {
                ed.selection.clearSelection(); // Why does it select in the first place?
                ed.moveCursorTo(cursor.row, column + cursor.column);
            }
        },
        sel: function(editor, range, count, param) {
            count = parseInt(count, 10) || 1;
            var ed = editor;
            var cursor = ed.getCursorPosition();
            var column = util.getRightNthChar(editor, cursor, param, count);

            if (typeof column === "number") {
                ed.moveCursorTo(cursor.row, column + cursor.column);
            }
        }
    },
    "shift-6": {
        nav: function(editor) {
            editor.navigateLineStart();
        },
        sel: function(editor) {
            editor.selection.selectLineStart();
        }
    },
    "shift-4": {
        nav: function(editor) {
            editor.navigateLineEnd();
        },
        sel: function(editor) {
            editor.selection.selectLineEnd();
        }
    },
    "0": {
        nav: function(editor) {
            var ed = editor;
            ed.navigateTo(ed.selection.selectionLead.row, 0);
        },
        sel: function(editor) {
            var ed = editor;
            ed.selectTo(ed.selection.selectionLead.row, 0);
        }
    },
    "shift-g": {
        nav: function(editor, range, count, param) {
            count = parseInt(count, 10);
            if (!count && count !== 0) { // Stupid JS
                count = editor.session.getLength();
            }
            editor.gotoLine(count);
        },
        sel: function(editor, range, count, param) {
            count = parseInt(count, 10);
            if (!count && count !== 0) { // Stupid JS
                count = editor.session.getLength();
            }
            editor.selection.selectTo(count, 0);
        }
    },
    "ctrl-d": {
        nav: function(editor, range, count, param) {
            editor.selection.clearSelection(); // Why does it select in the first place?
            editor.gotoPageDown();
        },
        sel: function(editor, range, count, param) {
            editor.selectPageDown();
        }
    },
    "ctrl-u": {
        nav: function(editor, range, count, param) {
            editor.selection.clearSelection(); // Why does it select in the first place?
            editor.gotoPageUp();
        },
        sel: function(editor, range, count, param) {
            editor.selectPageUp();
        }
    },
    "g": {
        param: true,
        nav: function(editor, range, count, param) {
            switch(param) {
                case "m":
                    console.log("Middle line");
                    break;
                case "e":
                    console.log("End of prev word");
                    break;
                case "g":
                    editor.gotoLine(count || 0);
            }
        },
        sel: function(editor, range, count, param) {
            switch(param) {
                case "m":
                    console.log("Middle line");
                    break;
                case "e":
                    console.log("End of prev word");
                    break;
                case "g":
                    editor.selection.selectTo(count || 0, 0);
            }
        }
    },
    "o": {
        nav: function(editor, range, count, param) {
            count = count || 1;
            var content = "";
            while (0 < count--)
                content += "\n";

            if (content.length) {
                editor.navigateLineEnd()
                editor.insert(content);
                util.insertMode(editor);
            }
        }
    },
    "shift-o": {
        nav: function(editor, range, count, param) {
            count = count || 1;
            var content = "";
            while (0 < count--)
                content += "\n";

            if (content.length) {
                editor.navigateUp();
                editor.navigateLineEnd()
                editor.insert(content);
                util.insertMode(editor);
            }
        }
    },
    "shift-5": {
        nav: function(editor, range, count, param) {
            var cursor = editor.getCursorPosition();
            var match = editor.session.findMatchingBracket({
                row: cursor.row,
                column: cursor.column + 1
            });

            if (match)
                editor.moveCursorTo(match.row, match.column);
        }
    }
};

module.exports.backspace = module.exports.left = module.exports.h;
module.exports.right = module.exports.l;
module.exports.up = module.exports.k;
module.exports.down = module.exports.j;

});
