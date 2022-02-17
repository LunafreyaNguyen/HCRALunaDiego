# HCRALunaDiego
HCRA project repository- Lunafreya and Diego

Resampling
Line 160 - Resample

Scaling
Line 191 - ScaleToSquare

Translation
Line 204 TranslateToOrigin

Rotation 
Line 256 - RotateBy


--PART 3--

Read in Dataset - Line - 388

    XML user input files are read into program thorugh the xmllog[]


Connect to Recognizer - Line 482 using offlineRecognize function

    offlineRecognize - Line 508

Loop Over Dataset (Random100) - Line 460

    In this step we loop through the entire array and do the recognition tests

Output the Result - Line 544

    Output the information necessary about the offline recognition tests int oa .csv file

--PART 4--
Prompt for Input - Line 426

	Prompted on letting go of one stroke

Right click to clear/redo last prompt - Line 371
	
	Makes sure the prmopt number and shape number are correct

Print Array to CSV - Line 416

	In function arrayToCSV, adds all the points separated by commas with x and y points

Download CSV file - Line 424

	Here and below, changes the download link to the most current gesture drawn