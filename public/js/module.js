(function (Icinga) {

    var dependencies;
    var hosts;
    // Double ajax request to getHostsAction() and getDependencyAction() in module php controller file to retrieve JSONs for hosts, dependencies

    var pushUrl = function (href) {
        history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
    };

    timeout();

    function timeout() {
        setTimeout(function () {

            if (window.location.href.endsWith('display')) {

                $.when(
                    $.ajax({
                        url: "/icingaweb2/dependency_plugin/graph/getHosts",
                        type: 'GET',
                        success: function (hostData) {
                            hosts = (JSON.parse(hostData));
                        }
                    }),

                    $.ajax({
                        url: "/icingaweb2/dependency_plugin/graph/getDependency",
                        type: 'GET',
                        success: function (dependencyData) {
                            dependencies = (JSON.parse(dependencyData));
                        }
                    })
                ).then(function () {
                    if(dependencies === 404){
                           alert("API Authentication Not Found, Please run Setup API command on host machine");
                    }
                    else{
                        console.log(hosts, dependencies);
                        drawDependencies(hosts, dependencies);
                    }
                });


            exitTimeout();

            } else {

                timeout();
            }
        }, 1000);



    }

    function exitTimeout(){
        setTimeout(function () {

            if (!window.location.href.endsWith('display')) {
             timeout();   
            }else{
                exitTimeout();
            }
        }, 1000);

    }





}(Icinga));