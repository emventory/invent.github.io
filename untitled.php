<html>
<head>
    <meta charset="utf-8">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      
      <link href="vendor/icons/icofont.min.css" rel="stylesheet" type="text/css">
      
      <link rel="stylesheet" href="font/bootstrap-icons.css">
      
      <link rel="stylesheet" type="text/css" href="vendor/slick/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="vendor/slick/slick-theme.min.css" />
      
      <link href="css/style.css" rel="stylesheet">
      
      <link href="vendor/sidebar/demo.css" rel="stylesheet">
    <title>JS CreateElement Demo</title>
</head>
<body>
    <script>
        let div = document.createElement('div');
			div.id = 'content';
			div.className = 'note';

			// create a new heading and add it to the div
			let h2 = document.createElement('h2');
			h2.textContent = 'Add h2 element to the div';
			div.appendChild(h2);

// add div to the document
document.body.appendChild(div);
    </script>
</body>
</html>