$(document).ready(init);

function init() {

  getPaganti();

  // al click sul cestino parte la funzione deletePagante RICORDA event delegation
  $(document).on("click","span i.delete",deletePagante);
}

function getPaganti() {

  $.ajax({
    url:"paganti.php",
    method: "GET",
    success: function (data) {
      // console.log(data);

      printPaganti(data);
    },
    error: function (err) {
      console.error(err);
    }
  });
}

function printPaganti(paganti) {
  // diviso in più passaggi (per rendere più chiaro)

  var target = $("#paganti");
  // inizializzo template handlebars
  var source = $("#pagante-template").html();
  var template = Handlebars.compile(source);

  for (var pagante of paganti){
    var html = template(pagante);
    target.append(html);
    // console.log(pagante);
  }

  // versione più compatta

  // var compiled = Handlebars.compile($("#pagante-template").html());
  // for (var pagante of paganti){
  //   $("#paganti").append(compiled(pagante));
  //   // console.log(pagante);
  // }
}

function deletePagante() {
  var paganteSelezionato = $(this).parent().parent();
  var id = $(this).parent().parent().data("id");
  console.log("l'id del pagante selezionato è", id);

  var conferma = confirm("Sei sicuro di eliminare definitivamente dal database il pagante con id " + id + "?");

  if (conferma){

    $.ajax({
      url:"deletePagante.php",
      method: "POST",
      data: {
        "id": id
      },
      success: function () {
        console.log("Hai definitivamente cancellato dal database il pagante con id " + id);
        // paganteSelezionato.remove();

        // per effetto rallentato
        paganteSelezionato.fadeOut("slow", function(){
          paganteSelezionato.remove();
        })
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
}
