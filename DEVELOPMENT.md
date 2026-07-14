I built this website with 2 frontends, public website (nextjs) and cms (vite + react) both powered by PostgreSQL which handles the database, edge function and auth. Nothing is hardcoded and all the content lives and editable in the CMS.

I purposely deviate from the Wordpress requirement and build headless javascript website instead because of a few reasons:

1.	Security. Wordpress biggest risk is the plugin ecosystem that you constantly have to patch and database sits behind the rendering layer so that will be easily targeted by attackers. By decoupling back end and front end, this lowers the risks.

2.	Scalability. Public pages are static and rendered by server via nextjs ecosystem which is good for SEO. Also it is scalable without expensive VPS and can go live rightaway with inexpensive hardware (does not need to render on every page load) and upgradable as traffic increases.

3.	Maintenance. No plugin conflict, PHP version upgrade, child theme conflict. The whole stack is one language which is Typescript.

The challenge which I managed to overcome is that everything must be created from scratch. Thanks to certain AI tool, the development process can be rapidly done while maintaining the project requirement; the Figma template.

While developing the demo site, I adhered every single SEO rules such as heading hierarchy, titles, robots.txt and etc. Also, I managed to score near perfect 100 scores on every metric in Google Page Speed which is helping in SEO factor.

In order to harden the security, few basic steps has been done in the backed. RLS patching, and enabling JWT on every edge function calling. If I have an extra time in the future, I can configure the IP access restrictions and enable SSL for database connections.

The front ends are deployed using docker with github CI/CD.
