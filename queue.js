module.exports  = function Queue() {
    this.elements = [];

    Queue.prototype.updateNicknames = function () {
        this.elements.forEach((e, index) => {
            const newName = `${index + 1} - ${e.oldName}`;
            console.log(`Updating member ${e.member.user.username} on index ${index} to ${newName}`);
            e.member.setNickname(newName).then(() => {
                console.log(`Nickname of ${e.member.user.username} updated!`);
            }).catch((error) => {
                this.remove(e.member.id);
            });
        })
    }

    Queue.prototype.enqueue = function (e) {
        this.elements.push(e);
        console.log(`Pushed to Queue: ${JSON.stringify(e)}`)
        this.updateNicknames();
    }

    Queue.prototype.remove = function (memberId) {
        const removeIndex = this.elements.findIndex((e) => {
            console.log(e.member.id === memberId);
            return e.member.id === memberId;
        });

        const [removedItem] = this.elements.splice(removeIndex, 1);
        if (removedItem) {
            console.log(`Removing member ${removedItem.member.user.username} from queue on index ${removeIndex}`);
            if (removedItem.hasNickname) {
                removedItem.member.setNickname(removedItem.oldName).then(() => {
                    console.log(`Nickname of ${removedItem.member.user.username} updated!`);
                    this.updateNicknames();
                }).catch((error) => {
                    console.log('Update failed');
                    this.updateNicknames();
                });
            } else {
                removedItem.member.setNickname(null).then(() => {
                    console.log(`Nickname of ${removedItem.member.user.username} updated!`);
                    this.updateNicknames();
                }).catch((error) => {
                    console.log('Update failed');
                    this.updateNicknames();
                });
            }
            console.log(`Removed from queue: ${removedItem.member.user.username}`);
            
        }
        
    }
}