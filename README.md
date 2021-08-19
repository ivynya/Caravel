# Caravel (Formerly Caravan)

[![https://maintained.cc/SDBagel/Caravan/1](https://maintained.cc/SDBagel/Caravan/1)](https://maintained.cc/SDBagel/Caravan/1/redirect)

Using Canvas LMS in the next generation.

Caravel is a custom Canvas client, making use of the Canvas APIs and services. Built on Angular, the goal is to allow users to feel in control of a powerful and responsive app without bogging down their workflow.

<hr>

## Applied Principles

### Configurability
The user should be in control of the app at all times. Caravel focuses on frontend customizability, including light and dark themes, options for compact and expanded sidebars, design considerations for large monitors and screens, faster navigation options, networking options, and more.

### Performance
Performance is key. Caravel makes use of an upgraded and more flexible caching system, using [Turbodrive](https://github.com/SDBagel/Turbodrive)'s core principles. In an environment where data does not change frequently, this is extremely beneficial to creating a snappy user experience. This is backed up by a robust notification system ensuring the user knows when they're seeing stale or fresh data.

### User Experience
User Experience is a huge part of Caravel. Built with a SPA architecture, Caravel reduces layout shift, "blank screen" flashes while loading, and other common issues with MVC/MVVC architectures (like on the official Canvas website). Additionally, responsive interactions and performance optimizations described above allow the user to move faster and more effectively.

<hr>

## Risks and Compliance
Deploy Caravel at your own risk. As Caravel operates off of an instance of Canvas LMS, you are responsible for coordinating the the owner of the backend for your relevant situation.

### Instructure Terms of Service
[Instructure states](https://canvas.instructure.com/doc/api/file.oauth.html#manual-token-generation) that for closed testing by developers, manual token generation to sign in is acceptable. This can be done by going to account settings and generating a token.

However, deploying this app to be used in a non-development context (such as, being used by multiple people not testing or developing the app) requires the coordination with the backend owner (ex: school district) to obtain a developer key, and the implementation of OAuth.

### Additional Information
While I believe I have studied the Instructure and Canvas terms of use well, I make no guarantees that this sort of app won't get you in trouble. The best solution is to do your own research first. However, I believe this project is okay for most purposes.

To be clear, I have not and will not make any attempt at "reverse engineering" Canvas (even though Canvas is open source?), the project not make use of any source code in the Instructure repository (licensed under A-GPL), and only references the API documentation for developers found publically available on any Canvas instance. Additionally, Caravel is not monetized.

### Caravel Software License
The source code (and only the source code) of Caravel is under the MIT license and is free to be modified or used elsewhere. Attribution (sdbagel.com, SDBagel | Kyle) is appreciated for anything using portions of or the entirety of the code. See the LICENSE file for more information.