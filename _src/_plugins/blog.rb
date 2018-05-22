# http://stackoverflow.com/a/27850727/733677

require 'open-uri'
require 'rss'
require 'simple-rss'

module Jekyll

    # Runs during jekyll build
    class RssFeedCollector < Generator
    safe true
    priority :high
    def generate(site)

        rss_items = SimpleRSS.parse open('https://blog.bigchaindb.com/feed/')

        # Create a new on-the-fly Jekyll collection called "articles"
        jekyll_items = Jekyll::Collection.new(site, 'articles')
        site.collections['articles'] = jekyll_items

        # Add fake virtual documents to the collection
        rss_items.items.each do |item|
            title = item.title
            link = item.link

            # Medium hack: get first image in content, then get smaller image size
            image = item.content_encoded[/img.*?src="(.*?)"/i,1].gsub(/max\/(.*)\//, "max/500/")

            path = '_articles/' + title.to_s.gsub(':','_') + '.md'
            path = site.in_source_dir(path)
            doc = Jekyll::Document.new(path, site: site, collection: jekyll_items)
            doc.data['title'] = title
            doc.data['link'] = link
            doc.data['image'] = image
            jekyll_items.docs << doc
        end
        rescue
            puts "Could not parse blog feed. Are you offline?"
        end
    end

end
