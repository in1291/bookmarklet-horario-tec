javascript: (function() {
    function pad(t, e) {
        return ("000000000" + t).substr(-e)
    }

    function myParser(t) {
        var e = {
                ene: 1,
                feb: 2,
                mar: 3,
                abr: 4,
                may: 5,
                jun: 6,
                jul: 7,
                ago: 8,
                sep: 9,
                oct: 10,
                nov: 11,
                dic: 12
            },
            n = t.trim().split(" "),
            r = n[3];
        r += pad(e[n[2]], 2) + pad(n[0], 2);
        var a = n[4].split(":");
        return r += "T" + pad(a[0], 2) + a[1] + "00"
    }

    function replaceChars(t) {
        var e = t.lastIndexOf("-"),
            n = t.substring(0, e);
        return n.replace(/-/g, "").replace(/:/g, "")
    }

    function getDetails(t) {
        for (var e = t.nextElementSibling, n = []; e && "#9bbad6" !== e.getAttribute("bgcolor");) {
            if ("#EEEEEE" === e.getAttribute("bgcolor")) {
                var r, a = e.children[1].textContent.trim(),
                    o = e.children[2].textContent,
                    i = e.children[3].textContent.trim(),
                    s = e.children[4].textContent.trim(),
                    l = e.children[5].textContent.trim();
                "A-" == s.substr(0, 2) && (s = s.substr(2)), r = s == l ? l : s + l, n.push({
                    fechas: a,
                    salon: r,
                    horario: i,
                    dias: o
                })
            }
            e = e.nextElementSibling
        }
        return n
    }

    function downloadICS() {
        data.name = "calendario.ics";
        var t = "text/calendar",
            blob = new Blob([data], {
                type: t
            });
        console.log(data);
        var filenameSuffix = "";
        var currentDate = new Date();
        if (currentDate.getMonth() >= 6 && currentDate.getMonth() < 12) {
            filenameSuffix = "Ago - Dic";
        }
        else {
            filenameSuffix = "Ene - Mayo";
        }
        filenameSuffix += " " + currentDate.getFullYear();
        anchor = document.createElement('a');
        anchor.download = "Horario Tec " + filenameSuffix + ".ics";
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/calendar', anchor.download, anchor.href].join(':');
        anchor.click();
        //url = window.URL.createObjectURL(e);
        //window.location.href = url
    }
    String.prototype.format || (String.prototype.format = function() {
        var t = arguments;
        return this.replace(/{(\d+)}/g, function(e, n) {
            return "undefined" != typeof t[n] ? t[n] : e
        })
    });
    var owaOld = "_rp_m5";
    var owaOffice = '[aria-label="Message Contents"]';
    var owaBeta = "mdpzkPPkhj9STdSHzJxnr";
    var weirdGmail1 = ".ii.gt.adP.adO";
    var weirdGmail2 = ".nH.aNW.apk.nn";
    var msgBodyVar = document.getElementById("Item.MessageNormalizedBody") || document.querySelector(owaOld) || document.querySelector(owaOffice) || document.querySelector(owaBeta) || document.querySelector(weirdGmail1) || document.querySelector(weirdGmail2);
    for (var dayseng = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"], data = "BEGIN:VCALENDAR\nPRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\nVERSION:2.0\nMETHOD:PUBLISH\nBEGIN:VTIMEZONE\nTZID:Central Standard Time\nBEGIN:STANDARD\nDTSTART:16011104T020000\nRRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=11\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0600\nEND:STANDARD\nBEGIN:DAYLIGHT\nDTSTART:16010311T020000\nRRULE:FREQ=YEARLY;BYDAY=2SU;BYMONTH=3\nTZOFFSETFROM:-0600\nTZOFFSETTO:-0500\nEND:DAYLIGHT\nEND:VTIMEZONE\n", classTmpl = "BEGIN:VEVENT\nCLASS:PUBLIC\nCREATED:{0}\nUID:{0}-1234{7}@itesm.mx\nDESCRIPTION: Horario de Clases\\n\nDTSTART;TZID=\"Central Standard Time\":{1}\nDTEND;TZID=\"Central Standard Time\":{2}\nDTSTAMP:{0}\nLOCATION:{3}\nRRULE:FREQ=WEEKLY;UNTIL={4};BYDAY={5}\nSEQUENCE:0\nSUMMARY;LANGUAGE=es-mx:{6}\nTRANSP:OPAQUE\nEND:VEVENT\n", msgBody = msgBodyVar, t1 = msgBody.querySelectorAll("center")[2], tableDesc = t1.querySelectorAll("table")[1], tbody = tableDesc.children[0], trs = tbody.children, subjectRows = tbody.querySelectorAll("tr[bgcolor=\"#9bbad6\"]"), subjects = [], i = 0; i < subjectRows.length; i++) subjects.push({
        name: subjectRows[i].children[1].querySelector("code").textContent.trim(),
        details: getDetails(subjectRows[i])
    });
    var eventID = 0;
    subjects.forEach(function(t) {
        var e = (new Date).toISOString().replace(/-/g, "");
        e = e.substring(0, e.indexOf(".")).replace(/:/g, "") + "Z", t.details.forEach(function(n) {
            var r = n.fechas.split("al"),
                a = n.horario.split(" a "),
                o = r[0].trim().toLowerCase(),
                i = myParser(o + " " + a[1]);
            o += " " + a[0];
            var s = r[1].trim().toLowerCase() + " " + a[1];
            o = myParser(o), s = myParser(s);
            for (var l = n.salon, d = "", E = 0; E < n.dias.length; E++) "" !== n.dias[E].trim() && ("" !== d && (d += ","), d += dayseng[E]);
            data += classTmpl.format(e, o, i, l, s, d, t.name, pad(eventID, 2)), eventID++
        })
    }), data += "END:VCALENDAR", window.setTimeout(function() {
        downloadICS()
    }, 500);
}())