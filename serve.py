import os

from twisted.internet import reactor

from twisted.web.server import Site
from twisted.web.static import File

from autobahn.twisted.resource import HTTPChannelHixie76Aware

# constants

SERVER_HTTP_PORT = 9001
SERVER_HTTP_RESOURCES = '.'

if __name__ == '__main__':

  # http setup

  webdir = os.path.abspath(SERVER_HTTP_RESOURCES)
  site = Site(File(webdir))
  site.protocol = HTTPChannelHixie76Aware
  reactor.listenTCP(SERVER_HTTP_PORT, site)

  # start session

  reactor.run()
