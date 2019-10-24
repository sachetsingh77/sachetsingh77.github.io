<script>
                                function showNavMenu(){
                                  console.log('show Nav Menu');
                                  var menuDivs = document.getElementsByClassName('c0198 c01105');
                                  var menuDiv = menuDivs[0];
                                  console.log(menuDiv.style.display);
                                  if (menuDiv.style.display == "initial"){
                                    menuDiv.style.display = "none";
                                  }
                                  else {
                                    menuDiv.style.display = "initial";
                                  }
                                  console.log(menuDiv.style.display);

                                }
                                </script>