$(function() {
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
    var self = this; // useful for nested functions

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
    	// here is the code for creating the column, which you will find below
    var $column = $('<div>').addClass('column');
var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
var $columnCardList = $('<ul>').addClass('column-card-list');
var $columnDelete = $('<button>').addClass('btn-delete').text('x');
var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

$columnDelete.click(function() {
        self.removeColumn();
});
//Add a note after clicking on the button:
    $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
});

    $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);
return $column;

}
  }

Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};

 var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column').click(function(){
        var name = prompt('Wpisz nazwę kolumny');
        var column = new Column(name);
        board.addColumn(column);
    });

    
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

   
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
})