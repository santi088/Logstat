A command-line tool that reads a web server log file and prints a summary.
The summary includes:
	Top 10 requested paths in descending order.
	Status code response in descending order.
	Response time average and max.
	Number of skipped, malformed lines.

How to use:
	node src/Logstat.ts <filename>

Sample output:
	

	Skipped lines:  0


	Top Paths            Count
	/logout              59
	/api/users           59
	/assets/style.css    57
	/index.html          55
	/dashboard           55
	/api/users/:id       55
	/search              54
	/contact             54
	/login               51
	/api/products        51


	Top Status           Count
	200                  205
	500                  78
	301                  76
	401                  73
	503                  70
	429                  69
	404                  68
	502                  65
	304                  64
	204                  63
	400                  61
	201                  59
	403                  49
	Max response time:  999
	Average response time: 528.93
		
