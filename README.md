<h1 align=center>vimstart</h1>
<h5 align=center>vim-command-like minimal startpage for your browser</h5>

![previews](https://user-images.githubusercontent.com/9277632/37031211-7f55d200-2170-11e8-8424-c9f2b6c21135.gif)

## Installation

Clone this repo

    git clone https://github.com/yuune/yuune-vim-startpage.git
    
And set the index.html as homepages or new tabs in your browser.


## Usage

There is a few command that can be used :

###### Open favourites website listed in web.json, example (open gmail):

     :em

###### Go to url, example :

     :u http://lovepancakes.blog

###### Search, example :

     :s How to make a delicious pancakes at home


## Editing

SEE [`web.json`](web.json).


## Frequently Asked Question

##### This things doesn't works well in my google chrome, fix please.

Due to security issues in chrome, they disabled local file access, so our web.json can't be readed. 

To enable it, pass `--allow-file-access-from-files` top your chrome args, example :

     $ /usr/bin/google-chrome --allow-file-access-from-files

Source: http://blog.derraab.com/2013/05/30/start-google-chrome-with-local-file-access-on-mac-os-x/


## License

The code is available under the [MIT license](LICENSE).
