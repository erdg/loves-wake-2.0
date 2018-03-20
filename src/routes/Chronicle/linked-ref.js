import { Component } from 'preact';

 // OPTIONAL: patch Component by default (you might want to delete this if you're a purist)
 Component.prototype.linkRef = function(name) {
    return linkRef(this, name);
    };

 // Export the linker as a standalone function:
 export default function linkRef(component, name) {
    let cache = component._linkedRefs || (component._linkedRefs = {});
    if (!component.refs) component.refs = {};
       return cache[name] || (cache[name] = c => {
             component.refs[name] = c;
       });
 }

