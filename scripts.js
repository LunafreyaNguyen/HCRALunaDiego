var click = false;
var prevX;
var prevY;
var points = [];
//Golden Ration used for 
const phi = 0.5 * (-1.0 + Math.sqrt(5.0)); 
const dt = 2.0 * (Math.PI / 180.0);
const range  = 45.0 * (Math.PI / 180.0);

//Box Class
function Box(minx, miny, dx, dy)
{
    this.x = minx; 
    this.y = miny;
    this.width = dx; 
    this.height = dy;
}

//Points Class
function Point(xcoord, ycoord)
{
    this.x = xcoord; 
    this.y = ycoord; 
}

//Stroke Class 
class Stroke
{
    constructor(name, points){
    this.name = name;
    //Resample points into new array
    this.points = points;
    //console.log(this.points);
    this.points = Resample(points, 64);
    //console.log(this.points);
    //Calculate indicative angle
    var rads = FindIndictativeAngle(this.points);

    //Rotate on opposite direction of indicative angle
    this.points = RotateBy(this.points, -rads);
    //console.log(this.points);

    //Scale to defined square, following 250 from study
    this.points = ScaleToSquare(this.points, 250);
    
    //Translate points to origin
    this.points = TranslateToOrigin(this.points);
    }
}

    //logs Class 
class logs {
    constructor(name, subject, speed, number, numpts, milliseconds, points){
    this.name = name;
    this.subject = subject;
    this.speed = speed;
    this.number = number;
    this.numpts = numpts;
    this.milliseconds = milliseconds;
    
    //this.points = points;
    //Resample points into new array
    var resampledPoints = Resample(points, 64);
    //Calculate indicative angle
    //this.points = resampledPoints;
    var rads = FindIndictativeAngle(resampledPoints);
    //Rotate on opposite direction of indicative angle
    this.points = RotateBy(resampledPoints, -rads);
    //console.log(this.points);
        
    //Scale to defined square, following 250 from study
    this.points = ScaleToSquare(this.points, 250);
    
    //Translate points to origin
    this.points = TranslateToOrigin(this.points);
    }
}

class OneDollar {
    constructor(){
        this.Strokes = new Array();
        this.Strokes.push(new Stroke("triangle", new Array(new Point(137,139),new Point(135,141),new Point(133,144),new Point(132,146),new Point(130,149),new Point(128,151),new Point(126,155),new Point(123,160),new Point(120,166),new Point(116,171),new Point(112,177),new Point(107,183),new Point(102,188),new Point(100,191),new Point(95,195),new Point(90,199),new Point(86,203),new Point(82,206),new Point(80,209),new Point(75,213),new Point(73,213),new Point(70,216),new Point(67,219),new Point(64,221),new Point(61,223),new Point(60,225),new Point(62,226),new Point(65,225),new Point(67,226),new Point(74,226),new Point(77,227),new Point(85,229),new Point(91,230),new Point(99,231),new Point(108,232),new Point(116,233),new Point(125,233),new Point(134,234),new Point(145,233),new Point(153,232),new Point(160,233),new Point(170,234),new Point(177,235),new Point(179,236),new Point(186,237),new Point(193,238),new Point(198,239),new Point(200,237),new Point(202,239),new Point(204,238),new Point(206,234),new Point(205,230),new Point(202,222),new Point(197,216),new Point(192,207),new Point(186,198),new Point(179,189),new Point(174,183),new Point(170,178),new Point(164,171),new Point(161,168),new Point(154,160),new Point(148,155),new Point(143,150),new Point(138,148),new Point(136,148))));
        this.Strokes.push(new Stroke("x", new Array(new Point(87,142),new Point(89,145),new Point(91,148),new Point(93,151),new Point(96,155),new Point(98,157),new Point(100,160),new Point(102,162),new Point(106,167),new Point(108,169),new Point(110,171),new Point(115,177),new Point(119,183),new Point(123,189),new Point(127,193),new Point(129,196),new Point(133,200),new Point(137,206),new Point(140,209),new Point(143,212),new Point(146,215),new Point(151,220),new Point(153,222),new Point(155,223),new Point(157,225),new Point(158,223),new Point(157,218),new Point(155,211),new Point(154,208),new Point(152,200),new Point(150,189),new Point(148,179),new Point(147,170),new Point(147,158),new Point(147,148),new Point(147,141),new Point(147,136),new Point(144,135),new Point(142,137),new Point(140,139),new Point(135,145),new Point(131,152),new Point(124,163),new Point(116,177),new Point(108,191),new Point(100,206),new Point(94,217),new Point(91,222),new Point(89,225),new Point(87,226),new Point(87,224))));
        this.Strokes.push(new Stroke("rectangle", new Array(new Point(78,149),new Point(78,153),new Point(78,157),new Point(78,160),new Point(79,162),new Point(79,164),new Point(79,167),new Point(79,169),new Point(79,173),new Point(79,178),new Point(79,183),new Point(80,189),new Point(80,193),new Point(80,198),new Point(80,202),new Point(81,208),new Point(81,210),new Point(81,216),new Point(82,222),new Point(82,224),new Point(82,227),new Point(83,229),new Point(83,231),new Point(85,230),new Point(88,232),new Point(90,233),new Point(92,232),new Point(94,233),new Point(99,232),new Point(102,233),new Point(106,233),new Point(109,234),new Point(117,235),new Point(123,236),new Point(126,236),new Point(135,237),new Point(142,238),new Point(145,238),new Point(152,238),new Point(154,239),new Point(165,238),new Point(174,237),new Point(179,236),new Point(186,235),new Point(191,235),new Point(195,233),new Point(197,233),new Point(200,233),new Point(201,235),new Point(201,233),new Point(199,231),new Point(198,226),new Point(198,220),new Point(196,207),new Point(195,195),new Point(195,181),new Point(195,173),new Point(195,163),new Point(194,155),new Point(192,145),new Point(192,143),new Point(192,138),new Point(191,135),new Point(191,133),new Point(191,130),new Point(190,128),new Point(188,129),new Point(186,129),new Point(181,132),new Point(173,131),new Point(162,131),new Point(151,132),new Point(149,132),new Point(138,132),new Point(136,132),new Point(122,131),new Point(120,131),new Point(109,130),new Point(107,130),new Point(90,132),new Point(81,133),new Point(76,133))));
        this.Strokes.push(new Stroke("circle", new Array(new Point(127,141),new Point(124,140),new Point(120,139),new Point(118,139),new Point(116,139),new Point(111,140),new Point(109,141),new Point(104,144),new Point(100,147),new Point(96,152),new Point(93,157),new Point(90,163),new Point(87,169),new Point(85,175),new Point(83,181),new Point(82,190),new Point(82,195),new Point(83,200),new Point(84,205),new Point(88,213),new Point(91,216),new Point(96,219),new Point(103,222),new Point(108,224),new Point(111,224),new Point(120,224),new Point(133,223),new Point(142,222),new Point(152,218),new Point(160,214),new Point(167,210),new Point(173,204),new Point(178,198),new Point(179,196),new Point(182,188),new Point(182,177),new Point(178,167),new Point(170,150),new Point(163,138),new Point(152,130),new Point(143,129),new Point(140,131),new Point(129,136),new Point(126,139))));
        this.Strokes.push(new Stroke("check", new Array(new Point(91,185),new Point(93,185),new Point(95,185),new Point(97,185),new Point(100,188),new Point(102,189),new Point(104,190),new Point(106,193),new Point(108,195),new Point(110,198),new Point(112,201),new Point(114,204),new Point(115,207),new Point(117,210),new Point(118,212),new Point(120,214),new Point(121,217),new Point(122,219),new Point(123,222),new Point(124,224),new Point(126,226),new Point(127,229),new Point(129,231),new Point(130,233),new Point(129,231),new Point(129,228),new Point(129,226),new Point(129,224),new Point(129,221),new Point(129,218),new Point(129,212),new Point(129,208),new Point(130,198),new Point(132,189),new Point(134,182),new Point(137,173),new Point(143,164),new Point(147,157),new Point(151,151),new Point(155,144),new Point(161,137),new Point(165,131),new Point(171,122),new Point(174,118),new Point(176,114),new Point(177,112),new Point(177,114),new Point(175,116),new Point(173,118))));
        this.Strokes.push(new Stroke("caret", new Array(new Point(79,245),new Point(79,242),new Point(79,239),new Point(80,237),new Point(80,234),new Point(81,232),new Point(82,230),new Point(84,224),new Point(86,220),new Point(86,218),new Point(87,216),new Point(88,213),new Point(90,207),new Point(91,202),new Point(92,200),new Point(93,194),new Point(94,192),new Point(96,189),new Point(97,186),new Point(100,179),new Point(102,173),new Point(105,165),new Point(107,160),new Point(109,158),new Point(112,151),new Point(115,144),new Point(117,139),new Point(119,136),new Point(119,134),new Point(120,132),new Point(121,129),new Point(122,127),new Point(124,125),new Point(126,124),new Point(129,125),new Point(131,127),new Point(132,130),new Point(136,139),new Point(141,154),new Point(145,166),new Point(151,182),new Point(156,193),new Point(157,196),new Point(161,209),new Point(162,211),new Point(167,223),new Point(169,229),new Point(170,231),new Point(173,237),new Point(176,242),new Point(177,244),new Point(179,250),new Point(181,255),new Point(182,257))));
        this.Strokes.push(new Stroke("zig-zag", new Array(new Point(307,216),new Point(333,186),new Point(356,215),new Point(375,186),new Point(399,216),new Point(418,186))));
        this.Strokes.push(new Stroke("arrow", new Array(new Point(68,222),new Point(70,220),new Point(73,218),new Point(75,217),new Point(77,215),new Point(80,213),new Point(82,212),new Point(84,210),new Point(87,209),new Point(89,208),new Point(92,206),new Point(95,204),new Point(101,201),new Point(106,198),new Point(112,194),new Point(118,191),new Point(124,187),new Point(127,186),new Point(132,183),new Point(138,181),new Point(141,180),new Point(146,178),new Point(154,173),new Point(159,171),new Point(161,170),new Point(166,167),new Point(168,167),new Point(171,166),new Point(174,164),new Point(177,162),new Point(180,160),new Point(182,158),new Point(183,156),new Point(181,154),new Point(178,153),new Point(171,153),new Point(164,153),new Point(160,153),new Point(150,154),new Point(147,155),new Point(141,157),new Point(137,158),new Point(135,158),new Point(137,158),new Point(140,157),new Point(143,156),new Point(151,154),new Point(160,152),new Point(170,149),new Point(179,147),new Point(185,145),new Point(192,144),new Point(196,144),new Point(198,144),new Point(200,144),new Point(201,147),new Point(199,149),new Point(194,157),new Point(191,160),new Point(186,167),new Point(180,176),new Point(177,179),new Point(171,187),new Point(169,189),new Point(165,194),new Point(164,196))));
        this.Strokes.push(new Stroke("left square bracket", new Array(new Point(140,124),new Point(138,123),new Point(135,122),new Point(133,123),new Point(130,123),new Point(128,124),new Point(125,125),new Point(122,124),new Point(120,124),new Point(118,124),new Point(116,125),new Point(113,125),new Point(111,125),new Point(108,124),new Point(106,125),new Point(104,125),new Point(102,124),new Point(100,123),new Point(98,123),new Point(95,124),new Point(93,123),new Point(90,124),new Point(88,124),new Point(85,125),new Point(83,126),new Point(81,127),new Point(81,129),new Point(82,131),new Point(82,134),new Point(83,138),new Point(84,141),new Point(84,144),new Point(85,148),new Point(85,151),new Point(86,156),new Point(86,160),new Point(86,164),new Point(86,168),new Point(87,171),new Point(87,175),new Point(87,179),new Point(87,182),new Point(87,186),new Point(88,188),new Point(88,195),new Point(88,198),new Point(88,201),new Point(88,207),new Point(89,211),new Point(89,213),new Point(89,217),new Point(89,222),new Point(88,225),new Point(88,229),new Point(88,231),new Point(88,233),new Point(88,235),new Point(89,237),new Point(89,240),new Point(89,242),new Point(91,241),new Point(94,241),new Point(96,240),new Point(98,239),new Point(105,240),new Point(109,240),new Point(113,239),new Point(116,240),new Point(121,239),new Point(130,240),new Point(136,237),new Point(139,237),new Point(144,238),new Point(151,237),new Point(157,236),new Point(159,237))));
        this.Strokes.push(new Stroke("right square bracket", new Array(new Point(112,138),new Point(112,136),new Point(115,136),new Point(118,137),new Point(120,136),new Point(123,136),new Point(125,136),new Point(128,136),new Point(131,136),new Point(134,135),new Point(137,135),new Point(140,134),new Point(143,133),new Point(145,132),new Point(147,132),new Point(149,132),new Point(152,132),new Point(153,134),new Point(154,137),new Point(155,141),new Point(156,144),new Point(157,152),new Point(158,161),new Point(160,170),new Point(162,182),new Point(164,192),new Point(166,200),new Point(167,209),new Point(168,214),new Point(168,216),new Point(169,221),new Point(169,223),new Point(169,228),new Point(169,231),new Point(166,233),new Point(164,234),new Point(161,235),new Point(155,236),new Point(147,235),new Point(140,233),new Point(131,233),new Point(124,233),new Point(117,235),new Point(114,238),new Point(112,238))));
        this.Strokes.push(new Stroke("v", new Array(new Point(89,164),new Point(90,162),new Point(92,162),new Point(94,164),new Point(95,166),new Point(96,169),new Point(97,171),new Point(99,175),new Point(101,178),new Point(103,182),new Point(106,189),new Point(108,194),new Point(111,199),new Point(114,204),new Point(117,209),new Point(119,214),new Point(122,218),new Point(124,222),new Point(126,225),new Point(128,228),new Point(130,229),new Point(133,233),new Point(134,236),new Point(136,239),new Point(138,240),new Point(139,242),new Point(140,244),new Point(142,242),new Point(142,240),new Point(142,237),new Point(143,235),new Point(143,233),new Point(145,229),new Point(146,226),new Point(148,217),new Point(149,208),new Point(149,205),new Point(151,196),new Point(151,193),new Point(153,182),new Point(155,172),new Point(157,165),new Point(159,160),new Point(162,155),new Point(164,150),new Point(165,148),new Point(166,146))));
        this.Strokes.push(new Stroke("delete", new Array(new Point(123,129),new Point(123,131),new Point(124,133),new Point(125,136),new Point(127,140),new Point(129,142),new Point(133,148),new Point(137,154),new Point(143,158),new Point(145,161),new Point(148,164),new Point(153,170),new Point(158,176),new Point(160,178),new Point(164,183),new Point(168,188),new Point(171,191),new Point(175,196),new Point(178,200),new Point(180,202),new Point(181,205),new Point(184,208),new Point(186,210),new Point(187,213),new Point(188,215),new Point(186,212),new Point(183,211),new Point(177,208),new Point(169,206),new Point(162,205),new Point(154,207),new Point(145,209),new Point(137,210),new Point(129,214),new Point(122,217),new Point(118,218),new Point(111,221),new Point(109,222),new Point(110,219),new Point(112,217),new Point(118,209),new Point(120,207),new Point(128,196),new Point(135,187),new Point(138,183),new Point(148,167),new Point(157,153),new Point(163,145),new Point(165,142),new Point(172,133),new Point(177,127),new Point(179,127),new Point(180,125))));
        this.Strokes.push(new Stroke("left curly brace", new Array(new Point(150,116),new Point(147,117),new Point(145,116),new Point(142,116),new Point(139,117),new Point(136,117),new Point(133,118),new Point(129,121),new Point(126,122),new Point(123,123),new Point(120,125),new Point(118,127),new Point(115,128),new Point(113,129),new Point(112,131),new Point(113,134),new Point(115,134),new Point(117,135),new Point(120,135),new Point(123,137),new Point(126,138),new Point(129,140),new Point(135,143),new Point(137,144),new Point(139,147),new Point(141,149),new Point(140,152),new Point(139,155),new Point(134,159),new Point(131,161),new Point(124,166),new Point(121,166),new Point(117,166),new Point(114,167),new Point(112,166),new Point(114,164),new Point(116,163),new Point(118,163),new Point(120,162),new Point(122,163),new Point(125,164),new Point(127,165),new Point(129,166),new Point(130,168),new Point(129,171),new Point(127,175),new Point(125,179),new Point(123,184),new Point(121,190),new Point(120,194),new Point(119,199),new Point(120,202),new Point(123,207),new Point(127,211),new Point(133,215),new Point(142,219),new Point(148,220),new Point(151,221))));
        this.Strokes.push(new Stroke("right curly brace", new Array(new Point(117,132),new Point(115,132),new Point(115,129),new Point(117,129),new Point(119,128),new Point(122,127),new Point(125,127),new Point(127,127),new Point(130,127),new Point(133,129),new Point(136,129),new Point(138,130),new Point(140,131),new Point(143,134),new Point(144,136),new Point(145,139),new Point(145,142),new Point(145,145),new Point(145,147),new Point(145,149),new Point(144,152),new Point(142,157),new Point(141,160),new Point(139,163),new Point(137,166),new Point(135,167),new Point(133,169),new Point(131,172),new Point(128,173),new Point(126,176),new Point(125,178),new Point(125,180),new Point(125,182),new Point(126,184),new Point(128,187),new Point(130,187),new Point(132,188),new Point(135,189),new Point(140,189),new Point(145,189),new Point(150,187),new Point(155,186),new Point(157,185),new Point(159,184),new Point(156,185),new Point(154,185),new Point(149,185),new Point(145,187),new Point(141,188),new Point(136,191),new Point(134,191),new Point(131,192),new Point(129,193),new Point(129,195),new Point(129,197),new Point(131,200),new Point(133,202),new Point(136,206),new Point(139,211),new Point(142,215),new Point(145,220),new Point(147,225),new Point(148,231),new Point(147,239),new Point(144,244),new Point(139,248),new Point(134,250),new Point(126,253),new Point(119,253),new Point(115,253))));
        this.Strokes.push(new Stroke("star", new Array(new Point(75,250),new Point(75,247),new Point(77,244),new Point(78,242),new Point(79,239),new Point(80,237),new Point(82,234),new Point(82,232),new Point(84,229),new Point(85,225),new Point(87,222),new Point(88,219),new Point(89,216),new Point(91,212),new Point(92,208),new Point(94,204),new Point(95,201),new Point(96,196),new Point(97,194),new Point(98,191),new Point(100,185),new Point(102,178),new Point(104,173),new Point(104,171),new Point(105,164),new Point(106,158),new Point(107,156),new Point(107,152),new Point(108,145),new Point(109,141),new Point(110,139),new Point(112,133),new Point(113,131),new Point(116,127),new Point(117,125),new Point(119,122),new Point(121,121),new Point(123,120),new Point(125,122),new Point(125,125),new Point(127,130),new Point(128,133),new Point(131,143),new Point(136,153),new Point(140,163),new Point(144,172),new Point(145,175),new Point(151,189),new Point(156,201),new Point(161,213),new Point(166,225),new Point(169,233),new Point(171,236),new Point(174,243),new Point(177,247),new Point(178,249),new Point(179,251),new Point(180,253),new Point(180,255),new Point(179,257),new Point(177,257),new Point(174,255),new Point(169,250),new Point(164,247),new Point(160,245),new Point(149,238),new Point(138,230),new Point(127,221),new Point(124,220),new Point(112,212),new Point(110,210),new Point(96,201),new Point(84,195),new Point(74,190),new Point(64,182),new Point(55,175),new Point(51,172),new Point(49,170),new Point(51,169),new Point(56,169),new Point(66,169),new Point(78,168),new Point(92,166),new Point(107,164),new Point(123,161),new Point(140,162),new Point(156,162),new Point(171,160),new Point(173,160),new Point(186,160),new Point(195,160),new Point(198,161),new Point(203,163),new Point(208,163),new Point(206,164),new Point(200,167),new Point(187,172),new Point(174,179),new Point(172,181),new Point(153,192),new Point(137,201),new Point(123,211),new Point(112,220),new Point(99,229),new Point(90,237),new Point(80,244),new Point(73,250),new Point(69,254),new Point(69,252))));
        this.Strokes.push(new Stroke("pigtail", new Array(new Point(81,219),new Point(84,218),new Point(86,220),new Point(88,220),new Point(90,220),new Point(92,219),new Point(95,220),new Point(97,219),new Point(99,220),new Point(102,218),new Point(105,217),new Point(107,216),new Point(110,216),new Point(113,214),new Point(116,212),new Point(118,210),new Point(121,208),new Point(124,205),new Point(126,202),new Point(129,199),new Point(132,196),new Point(136,191),new Point(139,187),new Point(142,182),new Point(144,179),new Point(146,174),new Point(148,170),new Point(149,168),new Point(151,162),new Point(152,160),new Point(152,157),new Point(152,155),new Point(152,151),new Point(152,149),new Point(152,146),new Point(149,142),new Point(148,139),new Point(145,137),new Point(141,135),new Point(139,135),new Point(134,136),new Point(130,140),new Point(128,142),new Point(126,145),new Point(122,150),new Point(119,158),new Point(117,163),new Point(115,170),new Point(114,175),new Point(117,184),new Point(120,190),new Point(125,199),new Point(129,203),new Point(133,208),new Point(138,213),new Point(145,215),new Point(155,218),new Point(164,219),new Point(166,219),new Point(177,219),new Point(182,218),new Point(192,216),new Point(196,213),new Point(199,212),new Point(201,211))));
    }
    Recognize(points, template, oneDollar)
    {
        var candidate = new Stroke("input", points);
        var templateIndex = -1;
        var bestDistance = +Infinity;
        console.log(template);
        console.log(points);
        for (var i = 0; i < oneDollar.Strokes.length; i++)
        {
            //USERINPUT
            var d = DistanceAtBestAngle(candidate.points, template[i].points, -range, +range, dt); 
            if (d <= bestDistance) {
                bestDistance = d;
                templateIndex = i;
            }
            //console.log(oneDollar.Strokes[i].name + ": " + d);
        }
        var score = (1.0 - bestDistance) / (0.5 * Math.sqrt((250.0 * 250.0) + (250.0 * 250.0)));
        var results = [];
        results.push(oneDollar.Strokes[templateIndex].name)
        results.push((100*(1 + score)).toFixed(2));
        return results;
        //return ("Shape is recognized to be a " + oneDollar.Strokes[templateIndex].name + " with a certainty of " + (100*(1 + score)).toFixed(2) + "%.");
        //return (templateIndex == -1) ? new OutputResult("No match.", 0.0) : new OutputResult(oneDollar.Strokes[templateIndex].name, score);
    }
    RecognizeSavePoints(points, template, oneDollar)
    {
        var candidate = new Stroke("input", points);
        var templateIndex = -1;
        var bestDistance = +Infinity;
        console.log(points);
        return points;
        for (var i = 0; i < oneDollar.Strokes.length; i++)
        {
            //USERINPUT
            var d = DistanceAtBestAngle(candidate.points, template[i].points, -range, +range, dt); 
            if (d <= bestDistance) {
                bestDistance = d;
                templateIndex = i;
            }
            //console.log(oneDollar.Strokes[i].name + ": " + d);
        }
        var score = (1.0 - bestDistance) / (0.5 * Math.sqrt((250.0 * 250.0) + (250.0 * 250.0)));
        var results = [];
        results.push(oneDollar.Strokes[templateIndex].name)
        results.push((100*(1 + score)).toFixed(2));
        return results;
        //return ("Shape is recognized to be a " + oneDollar.Strokes[templateIndex].name + " with a certainty of " + (100*(1 + score)).toFixed(2) + "%.");
        //return (templateIndex == -1) ? new OutputResult("No match.", 0.0) : new OutputResult(oneDollar.Strokes[templateIndex].name, score);
    }
}

function OutputResult(bestTemp, scoreTemp)
{
    this.name = bestTemp;
    this.score = scoreTemp;
}

function PathDistance(A, B)
{
    var distance = 0.0;
    if(A.length < B.length)
        var smaller = A.length;
    else
        var smaller = B.length;
    for(var i = 0; i < smaller; i++){
        distance += Distance(A[i], B[i]);
    }
    return distance / A.length;
}

function DistanceAtBestAngle(points, template, a, b, dt)
{
    var x1 = phi * a + (1.0 - phi) * b;
    var f1 = DistanceAtAngle(points, template, x1);
    var x2 = (1.0 - phi) * a + phi * b;
    var f2 = DistanceAtAngle(points, template, x2);

    while (Math.abs(b - a) > dt)
    {

        if(f1 < f2)
        {
            b = x2;
            x2 = x1;
            f2 = f1;
            x1 = phi * a + (1.0 - phi) * b;
            f1 = DistanceAtAngle(points, template, x1);
        }
        else
        {
            a= x1;
            x1 = x2;
            f1 = f2;
            x2 = (1.0 - phi) * a + phi * b;
            f2 = DistanceAtAngle(points, template, x2);
        }

        return Math.min(f1, f2);
    }
}

function DistanceAtAngle(points, template, rads)
{
    //console.log(template);
    var newpoints = RotateBy(points, rads);
    //REMEMBER TO CHANGE
    return PathDistance(newpoints, template);
}

function Resample(points, n)
{
    var I = (PathLength(points))/(n-1); // path points distribution
    var D = 0.0; // distance 
    var resampledPoints = [];
    resampledPoints.push(points[0]);
    for(var i = 1; i < points.length; i++){
        var d = Distance(points[i-1], points[i]);
        if((D + d) >= I){
            var qx = ~~points[i-1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
            var qy = ~~points[i-1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
            resampledPoints.push(new Point(qx, qy));
            points.splice(i, 0, new Point(qx, qy));
            D = 0;
        }
        else
            D = D + d;
    }
    return resampledPoints;
}

/*
    SCALE-TO-SQUARE(points, size)
        B ??? BOUNDING-BOX(points)
        foreach point p in points do
            qx ??? px ?? (size / Bwidth)
            qy ??? py ?? (size / Bheight)
            APPEND(newPoints, q)
        return newPoints
*/
function ScaleToSquare(points, size)
{
    var B = BoundingBox(points);
    var scaled = new Array();

    for (var i = 0; i < points.length; i++) 
    {
        var qx = ~~points[i].x * (size / B.width);
        var qy = ~~points[i].y * (size / B.height);
        scaled.push(new Point(qx, qy));
    }
    return scaled;
}
function TranslateToOrigin(points){
    var newPoints = [];
    var center = FindCentroid(points);
    for(var i = 0; i < points.length; i++){
        var x = ~~points[i].x - center.x;
        var y = ~~points[i].y - center.y;
        newPoints.push(new Point(x, y));
    }
    return newPoints;
}

//BOUNDINGBOX returns a rectangle according to (minx, miny), (maxx, maxy).
function BoundingBox(points)
{
    var minX = +Infinity;
    var maxX = -Infinity;
    var minY = +Infinity;
    var maxY = -Infinity;

    for (var i = 0; i < points.length; i++) 
    {
        minX = Math.min(minX, points[i].x);
        minY = Math.min(minY, points[i].y);
        maxX = Math.max(maxX, points[i].x);
        maxY = Math.max(maxY, points[i].y);
    }

    return new Box(minX, minY, maxX - minX, maxY - minY);
}

/*
qx ??? (px ??? cx) COS ?? ??? (py ??? cy) SIN ?? + cx
qy ??? (px ??? cx) SIN ?? + (py ??? cy) COS ?? + cy
*/
function RotateBy(points, rads)
{
    var c = FindCentroid(points);
    var cos = Math.cos(rads);
    var sin = Math.sin(rads);
    var rotated = [];
    for (var i = 0; i < points.length; i++) 
    {
        //Points rotations
        var qx = (~~points[i].x - c.x) * cos - (~~points[i].y - c.y) * sin + c.x;
        var qy = (~~points[i].x - c.x) * sin + (~~points[i].y - c.y) * cos + c.y;
        //Append to new array
        rotated.push(new Point(qx, qy));
    }
    
    return rotated;
}

//Find Centroid 
function FindCentroid(points)
{
    var cenX = 0.0;
    var cenY = 0.0;
    //Sums all x/y coords
    for (var i = 0; i < points.length; i++)
    {
        cenX += ~~points[i].x;
        cenY += ~~points[i].y;
    }

    //Calculates average
    cenX /= points.length;
    cenY /= points.length;

    //Returns centroid coordinates
    return new Point(cenX, cenY);
}

/*
    Find the angle betweeen the horizontal and the first points using centroid
*/
function FindIndictativeAngle(points)
{
    var c = FindCentroid(points);
    
    return Math.atan2(~~c.y - ~~points[0].y, ~~c.x - ~~points[0].x);
}

function PathLength(points)
{
    var pathLength = 0.0;
    for (var i = 0; i < points.length-1; i++){
        pathLength += Distance(points[i], points[i+1]);
    }
    return pathLength;
}

function Distance(a, b)
{
    var distanceX = b.x - a.x;
    var distanceY = b.y - a.y;

    var distance = Math.sqrt((distanceX*distanceX) + (distanceY * distanceY));
    return distance;
}

//GUI Functions
//On mouse click
function onMouseDown(mouseX, mouseY, mouseButton){
    prevX = mouseX;
    prevY = mouseY;
    points.push(new Point(mouseX, mouseY));
    click = true;
    //Clears the Canvas
    var ctx = canvas.getContext('2d');
    var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < canvasData.data.length; i++)
        canvasData.data[i] = 0;
    ctx.putImageData(canvasData, 0, 0);
    //Clears the Points array
    points = [];
    if(mouseButton == 2){
        if(promptNum == 1){
            promptNum = 9;
            if(shapeNum != 0)
                shapeNum--;
        }
        else
            promptNum--;
        if(~~promptNum+1 == 11){
            document.getElementById('prompt').innerHTML = "Left click and drag to leave pixels, right click to clear the canvas and undo last input!\n Please draw " + shapePrompt[shapeNum+1] + " 1."; 
            }
        else
            document.getElementById('prompt').innerHTML = "Left click and drag to leave pixels, right click to clear the canvas and undo last input!\n Please draw " + shapePrompt[shapeNum] + " " + (~~promptNum) + "."; 

    }
}

//On mouse drag
function onMouseMove(mouseX, mouseY, mouseButton){
    //If the mouse drag clicks, create a stroke from previous location to new location
    if(click){
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(mouseX, mouseY);
        ctx.lineWidth = "4";
        ctx.strokeStyle = "black";
        ctx.stroke();
        points.push(new Point(mouseX, mouseY));
        prevX = mouseX;
        prevY = mouseY;
    }
}    

var promptNum = 1;
var shapeNum = 0;
var shapePrompt = ["triangle", "x", "rectangle", "circle", "check", "caret", "zig-zag",
                    "arrow", "left square bracket", "right square bracket", "v", "delete",
                    "left curly brace", "right curly brace", "star", "pigtail"]
//On mouse click let go
function onMouseUp(mouseX, mouseY, mouseButton){
    click = false;
    input = new Stroke ("input", points);
    var analyze = new OneDollar;
    var results = analyze.RecognizeSavePoints(input.points, analyze.Strokes, analyze);
    function arrayToCSV(array){
        var fileData = "data:text/csv;charset=utf-8\n";       
        for(var i = 0; i < array.length; i++){
            fileData += "," + array[i].x + "," + array[i].y;
        }
        return fileData;
    }

    var download = encodeURI(arrayToCSV(results));
    console.log(download);
    document.getElementById('results').innerHTML = "<a download=\"" + promptNum + shapePrompt[shapeNum] + "\" href=\"" + download + "\">Download " + shapePrompt[shapeNum] + " " + promptNum + " data.</a>";
    if(~~promptNum+1 == 11){
        document.getElementById('prompt').innerHTML = "Left click and drag to leave pixels, right click to clear the canvas and undo last input!\n Please draw " + shapePrompt[shapeNum+1] + " 1."; 
    }
    else
        document.getElementById('prompt').innerHTML = "Left click and drag to leave pixels, right click to clear the canvas and undo last input!\n Please draw " + shapePrompt[shapeNum] + " " + (~~promptNum+1) + "."; 
    if(promptNum > 9){
        shapeNum++;
        promptNum = 1;
    }
    else
        promptNum++;
}
var downloadURL;
function arrayToCSV(array){
    var allData = new Blob(array, {type: 'text/plain'});
    if(downloadURL !== null)
        window.URL.revokeObjectURL(downloadURL);
    downloadURL = window.URL.createObjectURL(allData);
    return downloadURL;
}

//On window refresh
window.addEventListener('load', (e) => {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];
    // Reading in files
    const selectedFiles = document.getElementById('inputButton');
    const list = document.getElementById('inputButton');
    //console.log(garbageArray);
    // FORMATTING
    // Gesture Name = 1
    // Subject = 3
    // Speed = 5
    // Number = 7
    // NumPts = 9
    // Milliseconds = 11
    // First X point = 21
    // First Y point = 23
    // First T point = 25
    // Second X point = prev + 6
    // etc
    var xmlLogs = [];
    var q;
    
    selectedFiles.addEventListener('change', (event) => {
        
        for(let xmlFile of Array.from(event.target.files)){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(xmlFile);
            let xmlPromise = new Promise(function(resolved, rejected) {
            fileReader.onload = function(e) {
                let result = fileReader.result;
                let garbageArray = (result.slice(60)).split('"');
                var tempPoints = new Array();
                for(let i = 0; i < garbageArray[9]; i++){
                    tempPoints.push(new Point(garbageArray[(i*6)+21], garbageArray[((i*6)+2)+21]));
                }
                q = new logs(garbageArray[1], garbageArray[3], garbageArray[5], garbageArray[7], garbageArray[9], garbageArray[11], tempPoints);
                xmlLogs.push(q) // REMEMBER THIS
                if(xmlLogs.length > 159){
                    resolved("did it");
                }
            };
            });
            xmlPromise.then(
                function(value){
                //all gesture names
                var user = [];
                var gestureType = [];
                var randomIter = [];
                var numTrainEx = [];
                var totalSizeTrainSet = [];
                var trainingSetCont = [];
                var candidate = [];
                var recoResult = [];
                var correctIncorrect = [];
                var recoResultScore = [];
                var resultBestMatch = [];
                var resuleBestSorted = [];
                var results = [];


                var averageAccuracy;

                var fileOutput = [user, gestureType, randomIter, numTrainEx, trainingSetCont, recoResultScore, resuleBestSorted];
                var candidateLogs = [];
                var exampleLogs = [];

                var resultsArray = [];
                var Gestures = ["arrow", "caret", "check", "circle", "delete_mark",
                                "left_curly_brace","left_sq_bracket", "pigtail",
                                "question_mark", "rectangle", "right_curly_bracket",
                                "right_sq_bracket", "star", "triangle", "v", "x"];
                //Random 100
                // for each user U, 1 - 10
                var iteration = 0;
                var UserGestureAccuracies = [];
                for(var User = 0; User < 10; User++){
                    console.log("User: " + User);
                    UserGestureAccuracies.push(new Array());
                    for(var E = 0; E < 9; E++){
                        var correctCount = 0;
                        let randomExample = new Array();
                        for(var x = 0; x < 16; x++)
                            randomExample.push(new Set());
                        var correctCount = 0;
                        for(var i = 0; i < 100; i++){
                            var trainingExamples = [];
                            candidateLogs = [];
                            for(var G = 0; G < 16; G++){
                                //Choose 1 candidate T from User/Gesture
                                randomExample[G].add(Math.floor(Math.random() * (10 - 1 + 1) + 1));// First value of the set will be the candidate
                                //Choose E templates from User/Gesture
                                candidateLogs.push(xmlLogs[randomExample[G][0]]);
                                while(randomExample[G].size < E+1)
                                    randomExample[G].add(Math.floor(Math.random() * (10 - 1 + 1) + 1));
                                for(var i_trainingExamples = 1; i_trainingExamples < randomExample[G].size; i_trainingExamples++)
                                    trainingExamples.push(randomExample[G][i_trainingExamples]);
                            }
                            //For each candidate T from 1 to G
                            for(var candidate = 0; candidate < randomExample.length; candidate++){
                                for(var example = 1; example < randomExample[candidate].size; example++){
                                    iteration++;
                                    if(offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[2] == 1)
                                        correctCount++;
                                    console.log([User, Gestures[candidate], iteration, trainingExamples.size, "User" + User + "_" + Gestures[Candidate] + "-" + trainingExamples, candidateLogs[candidate].name, offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[0], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[2], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[1], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[0], trainingExamples[candidate]]);
                                    resultsArray.push([User, Gestures[candidate], iteration, trainingExamples.size, "User" + User + "_" + Gestures[Candidate] + "-" + trainingExamples, candidateLogs[candidate].name, offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[0], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[2], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[1], offlineRecognize(candidateLogs[candidate], trainingExamples[candidate][example])[0], trainingExamples[candidate]]);
                                }
                            }
                            console.log(iteration);
                        }
                        UserGestureAccuracies[User].push(correctCount/100.0);
                    }
                }
                var download = encodeURI(arrayToCSV(resultsArray));
                window.open(download);
                console.log(download);

                function offlineRecognize(candidate, example)
                {
                    var templateIndex = -1;
                    var bestDistance = +Infinity;
                    var res = [];
                    for(var e = 0; e < example.length; e++){
                        var distance = DistanceAtBestAngle(candidate.points, example[e].points, -range, +range, dt);
                        //console.log(example[e]);
                        if(bestDistance > distance){
                            bestDistance = distance;
                            templateIndex = e;
                        }
                    }
                    var score = (1.0 - distance) / (0.5 * Math.sqrt((250.0 * 250.0) + (250.0 * 250.0)));
                    res.push(example[templateIndex]);
                    res.push((100*(1 + score)).toFixed(2));

                    if(example[templateIndex].name.slice(0, -2) == candidate.name.slice(0, -2))
                        res.push(1);
                    else
                        res.push(0);

                    return res;
                    //return ("Shape is recognized to be a " + oneDollar.Strokes[templateIndex].name + " with a certainty of " + (100*(1 + score)).toFixed(2) + "%.");
                    //return (templateIndex == -1) ? new OutputResult("No match.", 0.0) : new OutputResult(oneDollar.Strokes[templateIndex].name, score);
                }

                //all gesture names
                
                // var offlineDollar = new OneDollar;
                // for(var i = 0; i < offlineDollar.Strokes.length; i++){
                //     exampleLogs.push(new logs(offlineDollar.Strokes[i].name, "3", "fast", "number", "numpts", "milliseconds", offlineDollar.Strokes[i].points));
                // }
                // console.log(exampleLogs);
                // console.log(xmlLogs);

                var downloadURL;
                function arrayToCSV(array){
                    var title = "data:text/csv;charset=utf-8,Recognition Log: Lunafreya Nguyen and Diego Batista Cruz // $1 Unistroke Recognizer // Provided XML // USER-DEPENDENT RANDOM-100,,,,,,,,,,,\n";
                    var columns = "User,GestureType,RandomIteration,numOfTrainingExamples,TotalSizeOfTrainingSet,TrainingSetContents,Candidate,RecoResultGestureType,CorrectIncorrect,RecoResultScore,RecoResultBestMatch,RecoResultNBestSorted\n";
                    console.log(array);
                    for (var i = 0; i < array.length; i++)
                    {
                        columns += array[i][0] + "," + array[i][1] + "," + array[i][2] + "," + array[i][3] + array[i][4] + "," + array[i][5] + "," + array[i][6] + "," + array[i][7] + "," + array[i][8] + "," + array[i][9] + "," + array[i][10] + "-" + array[i][11]+ ",";
                        columns += "\b],\n";
                        console.log(array[i][0] + "," + array[i][1] + "," + array[i][2] + "," + array[i][3] + array[i][4] + "," + array[i][5] + "," + array[i][6] + "," + array[i][7] + "," + array[i][8] + "," + array[i][9] + "," + array[i][10] + "-" + array[i][11]+ ",");

                    }
                    var fileText = title + columns;
                    return fileText;
                }
            });
        }
    });
});

//On window resize
window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];
});



