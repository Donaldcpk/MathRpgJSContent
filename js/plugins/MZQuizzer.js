

//=============================================================================
// MZ-Quiz-Engine.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v0.0.1 Quiz Engine for MZ
 * @author Starbird
 * @help MZ-Quiz-Engine.js
 *
 * Basic Quiz Engine for RPG Maker MZ
 *
 * @command getQuestion
 * @desc This pulls the next question from questionDatabase.js
 *
 * @help Please see MZ Quizzer documentation for more help. 
 *
 * Game VARIABLES and SWITCHES begin at 991 and are reserved up to 999 
 * for this plugin. 
 *
 * Game Switch 991 - Switch that activates upon correct answer response
 *
 * Game Switch 992 - Switch that activates upon wrong answer response
 *
 * Game Variable 991 - stores text input strings 
 * for answering Short Answer questions. 
 * 
 * Game Variable 992 - the current question number and determines which 
 * question to pull next from the database. 
 *
 * Game Variable 993 - total number of correct answers. 
 *
 * Game Variable 994 - total number of wrong answers. 
 *
 * Game Variable 995 - Question Timer Result. 
 *
 * Game Variable 996 - Streak Count (correct answers in a row). 
 *
 * Game Variable 997 - Slump Count (wrong answers in a row). 
 *
 * Game Variable 998 - Reward ID. 
 *
 * Game Variable 999 - Reward Amount.
 *
 * Game Variable 1000 - Incorrect Answer Explanation Text 
 *
 * PICTURES 96, 97, 98, and 99 are used. DO NOT USE THESE PICTURE NUMBERS.
 * 
 * CREDITS
 * Text Input adapted from darkkitten's CMDInput.js
 * Text instant display adapted from Jatopian's InstantText.js 
 * Force-cancel on timer expiration adapted from HIME_TimedChoiceSelection.js himeworks.com
 * Force-stop audio on answer completion adapted from Chaucer's Stop Sound Clip 
 * All plugins adapted and used in compliance with respective Terms of Use.
 *  
 */
 

Scene_MenuBase.prototype.createBackground = function() {
    this._backgroundFilter = new PIXI.filters.BlurFilter, this._backgroundSprite = new Sprite, this._backgroundSprite.bitmap = SceneManager.backgroundBitmap(), this._backgroundSprite.filters = [this._backgroundFilter], this.addChild(this._backgroundSprite), this.setBackgroundOpacity(0)
};
const pluginName = "MZQuizzer";

function getQuestion(e) {
    var t = questionDatabase.Questions[e].T;
    questionDatabase.Questions[e].Q_T;
    1 < t && setChoiceTimer(t);
    var s, a;
    questionDatabase.Questions[e].I;
    switch (1 == questionDatabase.Questions[e].E ? (s = questionDatabase.Questions[e].Q, console.log(s), s = rotHex(s), s = atob(s)) : (s = questionDatabase.Questions[e].Q, console.log(s)), questionDatabase.Questions[e].Q_T) {
        case 1:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), window.formattedQuestion = a, askShortAnswerQuestion(e, a);
            break;
        case 2:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), askMultipleChoiceQuestion2(e, a);
            break;
        case 3:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), askMultipleChoiceQuestion3(e, a);
            break;
        case 4:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), askMultipleChoiceQuestion4(e, a);
            break;
        case 5:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), askMultipleChoiceQuestion5(e, a);
            break;
        case 9:
            a = 200 < s.length ? stringDivider(s = "\\}" + s, 95, "\n") : stringDivider(s, 56, "\n"), askTrueOrFalseQuestion(e, a);
            break;
        default:
            console.log("check question type for question #" + e + " in database")
    }
}

function Scene_TextInput() {
    this.initialize(...arguments)
}

function Window_TextEdit() {
    this.initialize(...arguments)
}

function Window_TextInput() {
    this.initialize(...arguments)
}

function calculateAverage(e, t) {
    let s = e / (t + 1) * 100;
    return s = +s.toFixed(2), s
}

function stringDivider(e, t, s) {
    if (e.length > t) {
        for (var a = t; 0 < a && " " != e[a]; a--);
        if (0 < a) return e.substring(0, a) + s + stringDivider(e.substring(a + 1), t, s)
    }
    return e
}

function rotHex(e) {
    var t = e => "䷏䷙䷒䷲䷋䷎䷅䷌䷠䷺䷵䷘䷆䷥䷛䷡䷑䷔䷪䷃䷊䷖䷝䷓䷁䷱䷄䷴䷀䷇䷳䷗䷩䷟䷮䷈䷹䷜䷯䷍䷿䷶䷸䷢䷚䷂䷕䷣䷭䷨䷦䷧䷉䷾䷷䷤䷰䷐䷽䷼䷻䷫䷞䷬=".indexOf(e);
    return e.split("").map(e => -1 < t(e) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+/=" [t(e)] : e).join("")
}
PluginManager.registerCommand(pluginName, "getQuestion", e => {
    $gameScreen.erasePicture(99), $gameScreen.erasePicture(98), $gameScreen.erasePicture(97), $gameScreen.erasePicture(96), $gameScreen.erasePicture(95), $gameSwitches.setValue(991, !1), $gameSwitches.setValue(992, !1), $gameVariables.setValue(1e3, 0);
    var t = $gameVariables.value(992),
        s = questionDatabase.Questions.length;
    console.log(s), s <= t && (t = 0, $gameVariables.setValue(992, 0), window.questionNumber = t), console.log("Question number " + t), getQuestion(window.questionNumber = t)
}), askMultipleChoiceQuestion2 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n");
    var n = questionDatabase.Questions[e].I;
    1 == n && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0));
    var r = questionDatabase.Questions[e].A;
    $gameMessage.setPositionType(0), $gameMessage.add(t), 1 == (r = questionDatabase.Questions[e].A) && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var o = (new Date).getTime();
    switch (Math.floor(2 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i], 0, -1), $gameMessage.choicePositionType(0);
            var d = [0, 0];
            checkAnswer_MC(o, e, d, n, r);
            break;
        case 2:
            $gameMessage.setChoices([i, a], 0, -1), $gameMessage.choicePositionType(0);
            d = [-1, 1];
            checkAnswer_MC(o, e, d, n, r);
            break;
        default:
            console.log("something is wrong")
    }
}, askMultipleChoiceQuestion3 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i), n = rotHex(n), n = atob(n)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n"), n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n");
    var r = questionDatabase.Questions[e].I;
    1 == r && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    var o = questionDatabase.Questions[e].A;
    1 == o && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var d = (new Date).getTime();
    switch (Math.floor(6 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n], 0, -1), $gameMessage.choicePositionType(0);
            var u = [0, 0, 0];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 2:
            $gameMessage.setChoices([a, n, i], 0, -1), $gameMessage.choicePositionType(0);
            u = [0, -1, 1];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 3:
            $gameMessage.setChoices([n, a, i], 0, -1), $gameMessage.choicePositionType(0);
            u = [-2, 1, 1];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 4:
            $gameMessage.setChoices([n, i, a], 0, -1), $gameMessage.choicePositionType(0);
            u = [-2, 0, 2];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 5:
            $gameMessage.setChoices([i, a, n], 0, -1), $gameMessage.choicePositionType(0);
            u = [-1, 1, 0];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 6:
            $gameMessage.setChoices([i, n, a], 0, -1), $gameMessage.choicePositionType(0);
            u = [-1, -1, 2];
            checkAnswer_MC(d, e, u, r, o);
            break;
        default:
            console.log("something is wrong")
    }
}, askMultipleChoiceQuestion4 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3,
        r = questionDatabase.Questions[e].A4;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i), n = rotHex(n), n = atob(n), r = rotHex(r), r = atob(r)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n"), n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n"), r = 200 < r.length ? stringDivider(r = "\\}" + r, 95, "\n") : stringDivider(r, 56, "\n");
    var o = questionDatabase.Questions[e].I;
    1 == o && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    var d = questionDatabase.Questions[e].A;
    1 == d && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var u = (new Date).getTime();
    switch (Math.floor(24 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n, r], 0, -1), $gameMessage.choicePositionType(0);
            var g = [0, 0, 0, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 2:
            $gameMessage.setChoices([a, i, r, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, 0, -1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 3:
            $gameMessage.setChoices([a, n, i, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -1, 1, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 4:
            $gameMessage.setChoices([a, n, r, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -1, -1, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 5:
            $gameMessage.setChoices([a, r, i, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -2, 1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 6:
            $gameMessage.setChoices([a, r, n, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -2, 0, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 7:
            $gameMessage.setChoices([i, a, r, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, 1, -1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 8:
            $gameMessage.setChoices([i, a, n, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, 1, 0, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 9:
            $gameMessage.setChoices([i, n, r, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -1, -1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 10:
            $gameMessage.setChoices([i, n, a, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -1, 2, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 11:
            $gameMessage.setChoices([i, r, n, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -2, 0, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 12:
            $gameMessage.setChoices([i, r, a, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -2, 2, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 13:
            $gameMessage.setChoices([n, a, i, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 1, 1, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 14:
            $gameMessage.setChoices([n, a, r, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 1, -1, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 15:
            $gameMessage.setChoices([n, i, a, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 0, 2, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 16:
            $gameMessage.setChoices([n, i, r, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 0, -1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 17:
            $gameMessage.setChoices([n, r, a, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, -2, 2, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 18:
            $gameMessage.setChoices([n, r, i, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, -2, 1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 19:
            $gameMessage.setChoices([r, a, n, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 1, 0, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 20:
            $gameMessage.setChoices([r, a, i, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 1, 1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 21:
            $gameMessage.setChoices([r, i, n, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 0, 0, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 22:
            $gameMessage.setChoices([r, i, a, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 0, 2, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 23:
            $gameMessage.setChoices([r, n, i, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, -1, 1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 24:
            $gameMessage.setChoices([r, n, a, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, -1, 2, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        default:
            console.log("something went wrong")
    }
}, askMultipleChoiceQuestion5 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3,
        r = questionDatabase.Questions[e].A4,
        o = questionDatabase.Questions[e].A5;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i), n = rotHex(n), n = atob(n), r = rotHex(r), r = atob(r), o = rotHex(o), o = atob(o)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n"), n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n"), r = 200 < r.length ? stringDivider(r = "\\}" + r, 95, "\n") : stringDivider(r, 56, "\n"), o = 200 < o.length ? stringDivider(o = "\\}" + o, 95, "\n") : stringDivider(o, 56, "\n");
    var d = questionDatabase.Questions[e].I;
    1 == d && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0));
    var u = questionDatabase.Questions[e].A;
    $gameMessage.setPositionType(0), $gameMessage.add(t), 1 == u && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var g = (new Date).getTime();
    switch (Math.floor(5 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n, r, o], 0, -1), $gameMessage.choicePositionType(0);
            var c = [0, 0, 0, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 2:
            $gameMessage.setChoices([i, a, n, r, o], 0, -1), $gameMessage.choicePositionType(0);
            c = [-1, 1, 0, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 3:
            $gameMessage.setChoices([i, n, a, r, o], 0, -1), $gameMessage.choicePositionType(0);
            c = [-1, -1, 2, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 4:
            $gameMessage.setChoices([i, n, r, a, o], 0, -1), $gameMessage.choicePositionType(0);
            c = [-1, -1, -1, 3, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 5:
            $gameMessage.setChoices([i, n, r, o, a], 0, -1), $gameMessage.choicePositionType(0);
            c = [-1, -1, -1, -1, 4];
            checkAnswer_MC(g, e, c, d, u);
            break;
        default:
            console.log("something is wrong")
    }
}, checkAnswer_MC = function(u, g, c, e, t) {
    var s = questionDatabase.Questions[g].E,
        h = questionDatabase.Questions[g].Q_T,
        m = questionDatabase.Questions[g].GUID,
        p = questionDatabase.Questions[g].Q,
        l = questionDatabase.Questions[g].C_A,
        _ = questionDatabase.Questions[g].A2,
        $ = questionDatabase.Questions[g].A3 || "",
        P = questionDatabase.Questions[g].A4 || "",
        M = questionDatabase.Questions[g].A5 || "",
        b = questionDatabase.Questions[g].S || "";
    1 == s && (p = rotHex(p), p = atob(p), l = rotHex(l), l = atob(l), _ = rotHex(_), _ = atob(_), $ = rotHex($), $ = atob($), P = rotHex(P), P = atob(P), M = rotHex(M), M = atob(M)), $gameMessage.setChoiceCallback(function(e) {
        var t = (new Date).getTime(),
            s = Math.round((t - u) / 1e3 * 10) / 10;
        switch ($gameVariables.setValue(995, s), $gameScreen.erasePicture(97), $gameScreen.erasePicture(98), $gameScreen.erasePicture(99), d = e - c[e]) {
            case 0:
                var a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"Y","T":' + s + ',"Q_T":' + h + '"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                var i = $gameVariables.value(993) + 1;
                $gameVariables.setValue(993, i), calculateAverage(i, g), rewardSystem();
                break;
            case 1:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + _ + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                var n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                var r = i / g * 100,
                    r = Math.floor(r),
                    o = questionDatabase.Questions[g].A2_Why || 0;
                penaltySystem(o);
                break;
            case 2:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + $ + '","T":' + s + ',"Q_T":' + h + ',"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A3_Why || 0;
                penaltySystem(o);
                break;
            case 3:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + P + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","Two":"' + _ + '","Three":"' + $ + '","Four":"' + P + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A4_Why || 0;
                penaltySystem(o);
                break;
            case 4:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + M + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","Two":"' + _ + '","Three":"' + $ + '","Four":"' + P + '","Five":"' + M + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A5_Why || 0;
                penaltySystem(o);
                break;
            default:
                var d = "Timer expired. No answer given";
                console.log(d)
        }
    })
}, askTrueOrFalseQuestion = function(e, t) {
    questionDatabase.Questions[e].Q, questionDatabase.Questions[e].C_A;
    var s = questionDatabase.Questions[e].I,
        a = questionDatabase.Questions[e].A;
    1 == s && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), 1 == a && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), PlayAudio1(questionDatabase.Questions[e].GUID)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    t = (new Date).getTime();
    $gameMessage.choicePositionType(0), $gameMessage.setChoices(["True", "False"], 0, -1), $gameMessage.choicePositionType(0), checkAnswer_TF(e, t)
}, checkAnswer_TF = function(g, c) {
    $gameMessage.setChoiceCallback(function(e) {
        var t = questionDatabase.Questions[g].E,
            s = questionDatabase.Questions[g].GUID,
            a = (questionDatabase.Questions[g].Q_T, questionDatabase.Questions[g].Q),
            i = (questionDatabase.Questions[g].I, questionDatabase.Questions[g].A, questionDatabase.Questions[g].C_A),
            n = questionDatabase.Questions[g].S || "",
            r = questionDatabase.Questions[g].A2_Why || 0;
        console.log(r), 1 == t && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i)), i = i <= 1e3 ? 0 : 1;
        var o, d, u, t = (new Date).getTime(),
            t = Math.round((t - c) / 1e3 * 10) / 10;
        $gameVariables.setValue(995, t), $gameScreen.erasePicture(97), $gameScreen.erasePicture(98), $gameScreen.erasePicture(99), e == i ? (d = '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"Y","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A":"' + (i = 0 == i ? "TRUE" : "FALSE") + '","S":"' + n + '"},', console.log(d), o = $gameVariables.value(993) + 1, $gameVariables.setValue(993, o), u = o / g * 100, u = Math.floor(u), rewardSystem()) : (u = (u = (d = (d = 0 == i ? '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"N","G_A":"FALSE","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A": "TRUE", "S":"' + n + '"},' : '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"N","G_A":"TRUE","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A":"FALSE","S":"' + n + '"},', console.log(d), $gameVariables.value(994) + 1), $gameVariables.setValue(994, d), o / g * 100), Math.floor(u)), penaltySystem(r))
    })
}, askShortAnswerQuestion = function(e) {
    SceneManager.push(Scene_TextInput), SceneManager.prepareNextScene()
}, Scene_TextInput.prototype = Object.create(Scene_MenuBase.prototype), (Scene_TextInput.prototype.constructor = Scene_TextInput).prototype.needsCancelButton = function() {
    return !1
}, Scene_TextInput.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this)
}, Scene_TextInput.prototype.prepare = function(e, t, s, a, i, n) {
    this.createSpriteset(), this._varID = 991;
    var r = questionDatabase.Questions[questionNumber].C_A;
    answerLength = r.length, this._maxLength = answerLength, this._ImageName = 0, this._InputWindowName = 0, this._useVariableforInput = !0, this._InputDefaultext = 0
}, Scene_TextInput.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this), this._text = $gameVariables.value(this._varID), this.createEditWindow(), this.createInputWindow()
}, Scene_TextInput.prototype.start = function() {
    var e;
    Scene_MenuBase.prototype.start.call(this), 1 == questionDatabase.Questions[questionNumber].I && (e = questionDatabase.Questions[questionNumber].GUID, this._myPic = new Sprite(ImageManager.loadPicture(e)), this.addChild(this._myPic), this._myPic.x = 460, this._myPic.y = 205), this._editWindow.refresh()
}, Scene_TextInput.prototype.createEditWindow = function() {
    var e = this.editWindowRect();
    this._editWindow = new Window_TextEdit(e), this._editWindow.setup(this.InputDefaultext, this._maxLength, this._useVariableforInput, this._varID, this._UseImage, this._ImageName), this.addWindow(this._editWindow)
}, Scene_TextInput.prototype.editWindowRect = function() {
    var e = this.calcWindowHeight(9, !0),
        t = $gameSystem.windowPadding(),
        s = ImageManager.faceHeight + 2 * t,
        t = (Graphics.boxWidth - 800) / 2,
        e = (Graphics.boxHeight - (s + e + 8)) / 2;
    return new Rectangle(t, e, 800, s)
}, Scene_TextInput.prototype.createInputWindow = function() {
    var e = this.inputWindowRect();
    this._inputWindow = new Window_TextInput(e), this._inputWindow.setEditWindow(this._editWindow), this._inputWindow.setHandler("ok", this.onInputOk.bind(this)), this.addWindow(this._inputWindow)
}, Scene_TextInput.prototype.inputWindowRect = function() {
    var e = this._editWindow.x,
        t = this._editWindow.y + this._editWindow.height + 8,
        s = this._editWindow.width,
        a = this.calcWindowHeight(9, !0) - 16;
    return new Rectangle(e, t, s, a)
}, Scene_TextInput.prototype.onInputOk = function() {
    $gameVariables.setValue(991, this._editWindow.text()), this.popScene(), checkAnswer_SA(questionNumber)
}, Scene_TextInput.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_Map, this.addChild(this._spriteset), this._spriteset.update(), console.log("Made it to createSpriteset")
}, Scene_TextInput.prototype.createWindowLayer = function() {
    this._windowLayer = new WindowLayer, this._windowLayer.x = (Graphics.width - Graphics.boxWidth) / 2, this._windowLayer.y = (Graphics.height - Graphics.boxHeight) / 2, this.addChild(this._windowLayer), console.log("create window layer")
}, Scene_TextInput.prototype.update = function() {
    this.updateMainMultiply(), Scene_Base.prototype.update.call(this)
}, Scene_TextInput.prototype.updateMainMultiply = function() {
    this.updateMain()
}, Scene_TextInput.prototype.updateMain = function() {
    var e = this.isActive();
    $gameTimer.update(e), $gameScreen.update()
}, Window_TextEdit.prototype = Object.create(Window_StatusBase.prototype), (Window_TextEdit.prototype.constructor = Window_TextEdit).prototype.initialize = function(e) {
    Window_StatusBase.prototype.initialize.call(this, e), console.log("Setting up Text Editor Window."), this._useImage = !1, this._imageName = "", this._MaxLength = 0, this._text = "", this._index = 0, this._defaultText = "", this.deactivate()
}, Window_TextEdit.prototype.setup = function(e, t, s, a, i, n) {
    this._useImage = i, this._imageName = n, this._MaxLength = t, !0 === this._useImage && ImageManager.loadPicture(this._imageName), this._index = this._text.length, this._defaultText = this._text, this.activate(), this.refresh()
}, Window_TextEdit.prototype.text = function() {
    return this._text
}, Window_TextEdit.prototype.restoreDefault = function() {
    return this._text = this._defaultText, this._index = this._text.length, this.refresh(), 0 < this._text.length
}, Window_TextEdit.prototype.add = function(e) {
    return this._index < this._MaxLength && (this._text += e, this._index++, this.refresh(), !0)
}, Window_TextEdit.prototype.back = function() {
    return 0 < this._index && (this._index--, this._text = this._text.slice(0, this._index), this.refresh(), !0)
}, Window_TextEdit.prototype.faceWidth = function() {
    return 100
}, Window_TextEdit.prototype.charWidth = function() {
    var e = $gameSystem.isJapanese() ? "Ａ" : "A";
    return this.DefaultTextWidth(e)
}, Window_TextEdit.prototype.DefaultTextWidth = function(e) {
    return this.contents.measureTextWidth(e)
}, Window_TextEdit.prototype.left = function() {
    if (!0 === this._useImage) {
        var e = (this.innerWidth + this.faceWidth()) / 2,
            t = (this._MaxLength + 1) * this.charWidth();
        return Math.min(e - t / 2, this.innerWidth - t)
    }
    e = this.innerWidth + this._defaultText / 2, t = (this._MaxLength + 1) * this.charWidth();
    return Math.min(e - t / 2, this.innerWidth - t)
}, Window_TextEdit.prototype.right = function() {
    return 10
}, Window_TextEdit.prototype.itemRect = function(e) {
    var t = this.left() + e * this.charWidth(),
        s = this.charWidth(),
        e = this.lineHeight();
    return new Rectangle(t, 110, s, e)
}, Window_TextEdit.prototype.underlineRect = function(e) {
    const t = this.itemRect(e);
    return t.x++, t.y += t.height - 4, t.width -= 2, t.height = 2, t
}, Window_TextEdit.prototype.underlineColor = function() {
    return ColorManager.normalColor()
}, Window_TextEdit.prototype.drawUnderline = function(e) {
    var t = this.underlineRect(e),
        e = this.underlineColor();
    this.contents.paintOpacity = 128, this.contents.fillRect(t.x, t.y, t.width, t.height, e), this.contents.paintOpacity = 255
}, Window_TextEdit.prototype.drawChar = function(e) {
    var t = this.itemRect(e);
    this.resetTextColor(), this.drawText(this._text[e] || "", t.x, t.y)
}, Window_TextEdit.prototype.refresh = function() {
    this.contents.clear(), this.drawTextEx(formattedQuestion, 0, 0);
    for (let e = 0; e < this._MaxLength; e++) this.drawUnderline(e);
    for (let e = 0; e < this._text.length; e++) this.drawChar(e);
    var e = this.itemRect(this._index);
    this.setCursorRect(e.x, e.y, e.width, e.height)
}, Window_TextInput.prototype = Object.create(Window_Selectable.prototype), (Window_TextInput.prototype.constructor = Window_TextInput).LATIN1 = ["A", "B", "C", "D", "E", "a", "b", "c", "d", "e", "F", "G", "H", "I", "J", "f", "g", "h", "i", "j", "K", "L", "M", "N", "O", "k", "l", "m", "n", "o", "P", "Q", "R", "S", "T", "p", "q", "r", "s", "t", "U", "V", "W", "X", "Y", "u", "v", "w", "x", "y", "Z", "[", "]", "^", "_", "z", "{", "}", "|", "~", "0", "1", "2", "3", "4", "!", "#", "$", "'", ";", "5", "6", "7", "8", "9", "(", ")", "*", "+", "-", "/", "=", "@", "<", ">", ":", ";", " ", "→", "OK"], Window_TextInput.LATIN2 = ["Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú", "À", "È", "Ì", "Ò", "Ù", "à", "è", "ì", "ò", "ù", "Â", "Ê", "Î", "Ô", "Û", "â", "ê", "î", "ô", "û", "Ä", "Ë", "Ï", "Ö", "Ü", "ä", "ë", "ï", "ö", "ü", "Ā", "Ē", "Ī", "Ō", "Ū", "ā", "ē", "ī", "ō", "ū", "Ã", "Å", "Æ", "Ç", "Ð", "ã", "å", "æ", "ç", "ð", "Ñ", "Õ", "Ø", "Š", "Ŵ", "ñ", "õ", "ø", "š", "ŵ", "Ý", "Ŷ", "Ÿ", "Ž", "Þ", "ý", "ÿ", "ŷ", "ž", "þ", "Ĳ", "Œ", "ĳ", "œ", "ß", "«", "»", " ", "←", "OK"], Window_TextInput.prototype.initialize = function(e) {
    Window_Selectable.prototype.initialize.call(this, e), this._editWindow = null, this._page = 0, this._index = 0
}, Window_TextInput.prototype.setEditWindow = function(e) {
    this._editWindow = e, this.refresh(), this.updateCursor(), this.activate()
}, Window_TextInput.prototype.table = function() {
    return [Window_TextInput.LATIN1, Window_TextInput.LATIN2]
}, Window_TextInput.prototype.maxCols = function() {
    return 10
}, Window_TextInput.prototype.maxItems = function() {
    return 90
}, Window_TextInput.prototype.itemWidth = function() {
    return Math.floor((this.innerWidth - this.groupSpacing()) / 18)
}, Window_TextInput.prototype.groupSpacing = function() {
    return 24
}, Window_TextInput.prototype.character = function() {
    return this._index < 88 ? this.table()[this._page][this._index] : ""
}, Window_TextInput.prototype.isPageChange = function() {
    return 88 === this._index
}, Window_TextInput.prototype.isOk = function() {
    return 89 === this._index
}, Window_TextInput.prototype.itemRect = function(e) {
    var t = this.itemWidth(),
        s = this.itemHeight() - 3,
        a = this.colSpacing(),
        i = this.rowSpacing(),
        n = this.groupSpacing(),
        r = e % 10,
        n = r * t + Math.floor(r / 5) * n + a / 2,
        e = Math.floor(e / 10) * s + i / 2;
    return new Rectangle(n, e, t - a, s - i)
}, Window_TextInput.prototype.drawItem = function(e) {
    var t = this.table()[this._page][e],
        e = this.itemLineRect(e);
    this.drawText(t, e.x, e.y, e.width, "center")
}, Window_TextInput.prototype.updateCursor = function() {
    var e = this.itemRect(this._index);
    this.setCursorRect(e.x, e.y, e.width, e.height)
}, Window_TextInput.prototype.isCursorMovable = function() {
    return this.active
}, Window_TextInput.prototype.cursorDown = function(e) {
    (this._index < 80 || e) && (this._index = (this._index + 10) % 90)
}, Window_TextInput.prototype.cursorUp = function(e) {
    (10 <= this._index || e) && (this._index = (this._index + 80) % 90)
}, Window_TextInput.prototype.cursorRight = function(e) {
    this._index % 10 < 9 ? this._index++ : e && (this._index -= 9)
}, Window_TextInput.prototype.cursorLeft = function(e) {
    0 < this._index % 10 ? this._index-- : e && (this._index += 9)
}, Window_TextInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length, this.refresh()
}, Window_TextInput.prototype.cursorPageup = function() {
    this._page = (this._page + this.table().length - 1) % this.table().length, this.refresh()
}, Window_TextInput.prototype.processCursorMove = function() {
    var e = this._page;
    Window_Selectable.prototype.processCursorMove.call(this), this.updateCursor(), this._page !== e && this.playCursorSound()
}, Window_TextInput.prototype.processHandling = function() {
    this.isOpen() && this.active && (Input.isTriggered("shift") && this.processJump(), Input.isPressed("cancel") && this.processBack(), Input.isRepeated("ok") && this.processOk())
}, Window_TextInput.prototype.isCancelEnabled = function() {
    return !1
}, Window_TextInput.prototype.processCancel = function() {
    this.processBack()
}, Window_TextInput.prototype.processJump = function() {
    89 !== this._index && (this._index = 89, this.playCursorSound())
}, Window_TextInput.prototype.processBack = function() {
    this._editWindow.back() && SoundManager.playCancel()
}, Window_TextInput.prototype.processOk = function() {
    this.character() ? this.onNameAdd() : this.isPageChange() ? (this.playOkSound(), this.cursorPagedown()) : this.isOk() && this.onNameOk()
}, Window_TextInput.prototype.onNameAdd = function() {
    this._editWindow.add(this.character()) ? this.playOkSound() : this.playBuzzerSound()
}, Window_TextInput.prototype.onNameOk = function() {
    "" === this._editWindow.text() ? this._editWindow.restoreDefault() ? this.playOkSound() : this.playBuzzerSound() : (this.playOkSound(), this.callOkHandler())
}, Window_TextInput.prototype.processHandling = function() {
    this.isOpen() && this.active && (!Input.isPressed("shift") && Input.isTriggered("a") && (this._index = 5, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("b") && (this._index = 6, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("c") && (this._index = 7, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("d") && (this._index = 8, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("e") && (this._index = 9, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("f") && (this._index = 15, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("g") && (this._index = 16, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("h") && (this._index = 17, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("i") && (this._index = 18, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("j") && (this._index = 19, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("k") && (this._index = 25, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("l") && (this._index = 26, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("m") && (this._index = 27, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("n") && (this._index = 28, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("o") && (this._index = 29, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("p") && (this._index = 35, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("q") && (this._index = 36, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("r") && (this._index = 37, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("s") && (this._index = 38, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("t") && (this._index = 39, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("u") && (this._index = 45, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("v") && (this._index = 46, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("w") && (this._index = 47, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("x") && (this._index = 48, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("y") && (this._index = 49, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("z") && (this._index = 55, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("a") && (this._index = 0, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("b") && (this._index = 1, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("c") && (this._index = 2, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("d") && (this._index = 3, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("e") && (this._index = 4, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("f") && (this._index = 10, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("g") && (this._index = 11, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("h") && (this._index = 12, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("i") && (this._index = 13, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("j") && (this._index = 14, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("k") && (this._index = 20, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("l") && (this._index = 21, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("m") && (this._index = 22, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("n") && (this._index = 23, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("o") && (this._index = 24, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("p") && (this._index = 30, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("q") && (this._index = 31, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("r") && (this._index = 32, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("s") && (this._index = 33, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("t") && (this._index = 34, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("u") && (this._index = 40, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("v") && (this._index = 41, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("w") && (this._index = 42, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("x") && (this._index = 43, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("y") && (this._index = 44, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("z") && (this._index = 50, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("0") && (this._index = 60, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("1") && (this._index = 61, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("2") && (this._index = 62, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("3") && (this._index = 63, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("4") && (this._index = 64, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered(">") && (this._index = 65, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("?") && (this._index = 66, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("<") && (this._index = 67, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("'") && (this._index = 68, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered(";") && (this._index = 69, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("5") && (this._index = 70, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("6") && (this._index = 71, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("7") && (this._index = 72, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("8") && (this._index = 73, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("9") && (this._index = 74, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("=") && (this._index = 75, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("-") && (this._index = 76, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("8") && (this._index = 77, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("?") && (this._index = 78, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("5") && (this._index = 79, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("=") && (this._index = 80, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("<") && (this._index = 81, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered(">") && (this._index = 82, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered(";") && (this._index = 85, this.onNameAdd()), Input.isTriggered("space") && (this._index = 86, this.onNameAdd()), Input.isRepeated("cancel") && this.processBack(), Input.isRepeated("backspace") && this.processBack(), Input.isRepeated("ok") && (this._index = 13, this.callOkHandler(), checkAnswer_SA(questionNumber)))
}, Input.keyMapper = {
    8: "backspace",
    9: "tab",
    13: "ok",
    16: "shift",
    17: "control",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "printscreen",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
   
}, checkAnswer_SA = function(e, t) {
    var s = questionDatabase.Questions[e].GUID,
        a = (questionDatabase.Questions[e].Q_T, questionDatabase.Questions[e].Q),
        i = (questionDatabase.Questions[e].I, questionDatabase.Questions[e].A, questionDatabase.Questions[e].C_A),
        n = questionDatabase.Questions[e].C_S,
        r = questionDatabase.Questions[e].S || "";
    1 == questionDatabase.Questions[e].E && (i = rotHex(i), i = atob(i));
    var o = $gameVariables.value(991);
    0 == o && (o = "qvxxxv No Answer Given vxxxvq"), 0 == n && (i = i.toLowerCase(), o = o.toLowerCase());
    var d, u, n = (new Date).getTime(),
        t = Math.round((n - t) / 1e3 * 10) / 10;
    $gameVariables.setValue(995, t), o == i ? (u = '{"GUID":' + s + ',"Q_N":' + e + ',"I_C":"Y","T":' + t + ',"Q_T":1,"Q":"' + a + '","C_A":"' + i + '","S":"' + r + '"},', console.log(u), d = $gameVariables.value(993) + 1, $gameVariables.setValue(993, d), calculateAverage(d, e), rewardSystem()) : (u = '{"GUID":' + s + ',"Q_N":' + e + ',"I_C":"N","G_A":"' + o + '","T":' + t + ',"Q_T":1,"Q":"' + a + '","C_A":"' + i + '","S":"' + r + '"},', console.log(u), u = $gameVariables.value(994) + 1, $gameVariables.setValue(994, u), o = o + " is not the correct answer.", calculateAverage(d, e), penaltySystem(o))
}, showCorrectAnswerPicture = function() {
    $gameScreen.showPicture(96, "MZQ_correctAnswer", 0, 330, 230, 100, 100, 255, 0), setTimeout(function() {
        $gameScreen.erasePicture(96), $gameSystem.onBeforeSave(), DataManager.saveGame(1)
    }, 800)
}, rewardSystem = function() {
    console.log(questionNumber), $gameTimer.stop(), playSoundEffect("MZQ_correctAnswer");
    var e = questionDatabase.Questions[questionNumber].A,
        t = questionDatabase.Questions[questionNumber].GUID;
    1 == e && AudioManager.stopSeAt(t), showCorrectAnswerPicture();
    e = $gameVariables.value(996) + 1;
    $gameVariables.setValue(996, e), $gameVariables.setValue(997, 0);
    var t = questionDatabase.Questions[questionNumber].R_T,
        s = questionDatabase.Questions[questionNumber].R_I,
        a = questionDatabase.Questions[questionNumber].R_A,
        e = questionDatabase.Questions[questionNumber].O_L;
    "Enemy" == t && (BattleManager.setup(s, !0, !0), $gamePlayer.makeEncounterCount(), SceneManager.push(Scene_Battle)), "Gold" == t && ($gameParty.gainGold(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[14]Gain \\G"), $gameMessage.add("\\{+\\v[999]\\c[14]\\G")), "Armor" == t && ($gameParty.gainItem($dataArmors[s], a, !0), $gameVariables.setValue(998, $dataArmors[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Armor"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "Item" == t && ($gameParty.gainItem($dataItems[s], a), $gameVariables.setValue(998, $dataItems[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Item"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "Weapon" == t && ($gameParty.gainItem($dataWeapons[s], a, !0), $gameVariables.setValue(998, $dataWeapons[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Weapon"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "HP" == t && (1 == e ? ($gameParty.leader().gainHp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains HP")) : ($gameParty.members().forEach(function(e) {
        e.gainHp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains HP")), $gameMessage.add("\\{+\\v[999] \\c[6]HP")), "XP" == t && (1 == e ? ($gameParty.leader().gainExp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains XP")) : ($gameParty.members().forEach(function(e) {
        e.gainExp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains XP")), $gameMessage.add("\\{+\\v[999] \\c[6]XP")), "MP" == t && (1 == e ? ($gameParty.leader().gainHp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains MP"), $gameMessage.add("\\{+\\v[999] \\c[6]MP")) : ($gameParty.members().forEach(function(e) {
        e.gainMp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains XP"), $gameMessage.add("\\{+\\v[999] \\c[6]XP"))), "TP" == t && (1 == e ? ($gameParty.leader().gainTp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains TP")) : ($gameParty.members().forEach(function(e) {
        e.gainTp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains TP")), $gameMessage.add("\\{+\\v[999] \\c[6]TP")), "Skill" == t && (1 == e ? ($gameParty.leader().learnSkill(s), $gameVariables.setValue(998, $dataSkills[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Learns Skill")) : ($gameParty.members().forEach(function(e) {
        e.learnSkill(s)
    }), $gameVariables.setValue(998, $dataSkills[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Learns Skill")), $gameMessage.add("\\{+\\c[6]\\v[998]")), "MHP" == t && (1 == e ? ($gameParty.leader().addParam(0, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases Max HP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(0, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increase Max HP")), $gameMessage.add("\\{+\\v[999] \\c[6]Max HP")), "MMP" == t && (1 == e ? ($gameParty.leader().addParam(1, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases Max MP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(1, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases Max MP")), $gameMessage.add("\\{+\\v[999] \\c[6]Max MP")), "ATK" == t && (1 == e ? ($gameParty.leader().addParam(2, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases ATK")) : ($gameParty.members().forEach(function(e) {
        e.addParam(2, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases ATK")), $gameMessage.add("\\{+\\v[999] \\c[6]ATK")), "DEF" == t && (1 == e ? ($gameParty.leader().addParam(3, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases DEF")) : ($gameParty.members().forEach(function(e) {
        e.addParam(3, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases DEF")), $gameMessage.add("\\{+\\v[999] \\c[6]DEF")), "AddState" == t && (1 == e ? ($gameParty.leader().addState(s), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader State Added")) : ($gameParty.members().forEach(function(e) {
        e.addState(s)
    }), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party State Added")), $gameMessage.add("\\{+\\c[6]\\v[998]")), "RemoveState" == t && (1 == e ? ($gameParty.leader().removeState(s), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader State Removed")) : ($gameParty.members().forEach(function(e) {
        e.removeState(s)
    }), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party State Removed")), $gameMessage.add("\\{-\\c[6]\\v[998]")), $gameVariables.setValue(992, questionNumber + 1), console.log("Question number " + $gameVariables.value(992)), $gameSwitches.setValue(991, !0)
}, showWrongAnswerPicture = function() {
    $gameScreen.showPicture(96, "MZQ_wrongAnswer", 0, 330, 230, 100, 100, 255, 0), setTimeout(function() {
        $gameScreen.erasePicture(96), $gameSystem.onBeforeSave(), DataManager.saveGame(1)
    }, 800)
}, penaltySystem = function(e) {
    $gameTimer.stop(), playSoundEffect("MZQ_wrongAnswer");
    var t = questionDatabase.Questions[questionNumber].A,
        s = questionDatabase.Questions[questionNumber].E,
        a = questionDatabase.Questions[questionNumber].GUID;
    null != e && 1 == s && (e = rotHex(e), e = atob(e)), null == e && (e = "The question timer expired."), 0 == e && (e = "No explanation for wrong answer provided."), e = 200 < e.length ? stringDivider(e = "\\}" + e, 95, "\n") : stringDivider(e, 56, "\n"), $gameVariables.setValue(1e3, e), console.log(e), 1 == t && AudioManager.stopSeAt(a), showWrongAnswerPicture();
    t = $gameVariables.value(997) + 1;
    $gameVariables.setValue(997, t), $gameVariables.setValue(996, 0);
    var a = questionDatabase.Questions[questionNumber].P_T,
        i = questionDatabase.Questions[questionNumber].P_I,
        n = questionDatabase.Questions[questionNumber].P_A,
        t = questionDatabase.Questions[questionNumber].O_L;
    "Enemy" == a && (BattleManager.setup(i, !1, !1), $gamePlayer.makeEncounterCount(), SceneManager.push(Scene_Battle)), "Gold" == a && ($gameParty.loseGold(n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[8]Lose \\G"), $gameMessage.add("\\c[18]\\{-\\v[999]\\c[8]\\G")), "Armor" == a && ($gameParty.gainItem($dataArmors[i], -n, !0), $gameVariables.setValue(998, $dataArmors[PenaltyId].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Armor"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "Item" == a && ($gameParty.gainItem($dataItems[i], -n), $gameVariables.setValue(998, $dataItems[i].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Item"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "Weapon" == a && ($gameParty.gainItem($dataWeapons[i], -n, !0), $gameVariables.setValue(998, $dataWeapons[i].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Weapon"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "HP" == a && (1 == t ? ($gameParty.leader().gainHp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses HP")) : ($gameParty.members().forEach(function(e) {
        e.gainHp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses HP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]HP")), "XP" == a && (1 == t ? ($gameParty.leader().gainExp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses XP")) : ($gameParty.members().forEach(function(e) {
        e.gainExp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses XP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]XP")), "MP" == a && (1 == t ? ($gameParty.leader().gainMp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses MP")) : ($gameParty.members().forEach(function(e) {
        e.gainMp(n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses MP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MP")), "TP" == a && (1 == t ? ($gameParty.leader().gainTp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses TP")) : ($gameParty.members().forEach(function(e) {
        e.gainTp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses TP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]TP")), "Skill" == a && (1 == t ? ($gameParty.leader().forgetSkill(i), $gameVariables.setValue(998, $dataWeapons[i].name), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses Skill")) : ($gameParty.members().forEach(function(e) {
        e.forgetSkill(i)
    }), $gameVariables.setValue(998, $dataWeapons[i].name), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses Skill")), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "MHP" == a && (1 == t ? ($gameParty.leader().addParam(0, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases Max HP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(0, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases Max HP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MHP")), "MMP" == a && (1 == t ? ($gameParty.leader().addParam(1, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases Max MP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(1, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases Max MP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MMP")), "ATK" == a && (1 == t ? ($gameParty.leader().addParam(2, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases ATK")) : ($gameParty.members().forEach(function(e) {
        e.addParam(2, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases ATK")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]ATK")), "DEF" == a && (1 == t ? ($gameParty.leader().addParam(3, -a), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases DEF")) : ($gameParty.members().forEach(function(e) {
        e.addParam(3, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases DEF")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]DEF")), "AddState" == a && (1 == t ? ($gameParty.leader().addState(i), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Party Leader State Added")) : ($gameParty.members().forEach(function(e) {
        e.addState(i)
    }), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Entire Party State Added")), $gameMessage.add("\\{+\\c[18]\\v[998]")), "RemoveState" == a && (1 == t ? ($gameParty.leader().removeState(i), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Party Leader State Removed")) : ($gameParty.members().forEach(function(e) {
        e.removeState(i)
    }), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Entire Party State Removed")), $gameMessage.add("\\{+\\c[18]\\v[998]")), $gameVariables.setValue(992, questionNumber + 1), $gameSwitches.setValue(992, !0)
}, playSoundEffect = function(e) {
    e = {
        name: e,
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(e)
}, PlayAudio1 = function(e) {
    var t = {
        name: questionDatabase.Questions[questionNumber].GUID,
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(t)
}, AudioManager.stopSeAt = function(t) {
    for (this._seBuffers.forEach(function(e) {
            e._url.match(escape(t)) && e.stop()
        }), i = 0; i < this._seBuffers.length; i++) this._seBuffers[i]._url.match(t) && (this._seBuffers.splice(i, 1), i--)
}, setChoiceTimer = function(e, t) {
    $gameMessage.setChoiceTimer(e, t), $gameTimer.start(e)
};
var MZQ_GameMessage_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    MZQ_GameMessage_clear.call(this), this._timedChoiceCount = 0, this._timedChoiceNum = -1, this._isForcedCancel = !1
}, Game_Message.prototype.setChoiceTimer = function(e, t) {
    0 < t && --t, this._timedChoiceCount = e, this._timedChoiceNum = t
}, Game_Message.prototype.timedChoiceCount = function() {
    return this._timedChoiceCount
}, Game_Message.prototype.timedChoiceNum = function() {
    return this._timedChoiceNum
}, Game_Message.prototype.forceCancel = function() {
    this._isForcedCancel = !0
}, Game_Message.prototype.isForcedCancel = function() {
    return this._isForcedCancel
};
var MZQ_WindowChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function(e) {
    MZQ_WindowChoiceList_initialize.call(this, e), this._count = 0
};
var MZQ_WindowChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
    this.setTimer(), MZQ_WindowChoiceList_start.call(this)
}, Window_ChoiceList.prototype.setTimer = function() {
    this._count = $gameMessage.timedChoiceCount()
};
var MZQ_WindowChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function() {
    MZQ_WindowChoiceList_update.call(this), this.updateTimer(), this.updateForceCancel()
}, Window_ChoiceList.prototype.updateTimer = function() {
    0 < this._count && (this._count--, 0 == this._count && $gameMessage.forceCancel())
}, Window_ChoiceList.prototype.updateForceCancel = function() {
    $gameMessage.isForcedCancel() && (this.deactivate(), this.callCancelHandler())
};
var MZQ_WindowChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
    MZQ_WindowChoiceList_callOkHandler.call(this), this._count = 0
};
var MZQ_WindowChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
Window_ChoiceList.prototype.callCancelHandler = function() {
    MZQ_WindowChoiceList_callCancelHandler.call(this), this._count = 0, penaltySystem()
}, ConfigManager.instantText = !0;
var alias_cm_md = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var e = alias_cm_md.call(this);
    return e.instantText = this.instantText, e
};
var alias_cm_ad = ConfigManager.applyData;
ConfigManager.applyData = function(e) {
    alias_cm_ad.call(this, e), this.instantText = this.readConfigInstantText(e, "instantText")
}, ConfigManager.readConfigInstantText = function(e, t) {
    t = e[t];
    return void 0 !== t ? t : getDefaultInstantText()
};
var alias_wm_udf = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    alias_wm_udf.call(this), !0 === ConfigManager.instantText && (this._showFast = !0)
}, Sprite_Timer.prototype.updatePosition = function() {
    this.x = (Graphics.width - this.bitmap.width) / 2, this.y = 584
}, Game_Timer.prototype.onExpire = function() {
    $gameScreen.erasePicture(99), $gameScreen.erasePicture(98), $gameScreen.erasePicture(97), $gameScreen.erasePicture(96), $gameScreen.erasePicture(95), 1 == questionDatabase.Questions[questionNumber].Q_T && SceneManager.pop(), console.log("Time has expired"), $gameTimer.stop(), $gameMessage.forceCancel(), penaltySystem()
};